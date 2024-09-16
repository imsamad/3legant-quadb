import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { EMediaEnum, ProductSchema, TProductSchema } from '../zodSchema';
import { ErrorMessage, InputField, TextareaField } from './InputField';
import { ChangeEvent, useState } from 'react';
import { useUploadPhotoMutation } from '../redux/slices/assetSlice';
import {
  useCreateProductMutation,
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from '../redux/slices/productApiSlices';
import { Toast } from './Toast';
import { useNavigate, useParams } from 'react-router-dom';
import { Toggle } from './Toggle';
import { useGetCategoriesQuery } from '../redux/slices/categoryApiSlices';
import { Select } from './Select';

export let ProductForm = ({ product: product__ }: any) => {
  let product_ = { ...product__ };
  if (product_) {
    if (product_.status && product_.status == 'PUBLISHED') {
      product_.published = true;
    } else if (typeof product_.status != 'undefined') {
      product_.published = false;
    }
  }
  const productForm = useForm<TProductSchema>({
    resolver: zodResolver(ProductSchema),
    values: product_ || {},
  });

  const [createProduct] = useCreateProductMutation();
  const [updatePRoduct] = useUpdateProductMutation();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (product: TProductSchema) => {
    try {
      if (product__) {
        await updatePRoduct({ productId: product_.id, ...product });
      } else {
        const res = await createProduct(product);
        console.log('res.data.product.id: ', res.data.product.id);
        navigate(`/admin/allProducts/${res.data.product.id}`, {
          replace: true,
        });
      }
      handleShowToast('Product created');
    } catch (error) {
      handleShowToast('Please try again');
    }
  };

  productForm.watch('medias');
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = (mes: string) => {
    setMessage(mes);
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setMessage('');
    setShowToast(false);
  };
  const { data, isLoading } = useGetCategoriesQuery({});
  return (
    <div className='my-8'>
      <p className='text-3xl text-center font-semibold'>Create Product</p>
      {showToast && (
        <Toast message={message} type='success' onClose={handleCloseToast} />
      )}
      <form
        onSubmit={productForm.handleSubmit(handleSubmit, (err) => {
          console.log(err);
        })}
        className='flex flex-col gap-2 max-w-screen-md mx-auto'
      >
        <Carousel
          medias={productForm.getValues('medias') || []}
          cb={(medias) => {
            productForm.setValue('medias', medias);
          }}
        />
        <div className='text-center'>
          <ErrorMessage
            error={
              !productForm.getValues('medias')?.length &&
              productForm.formState.errors.medias?.message
                ? 'Medias are required'
                : ''
            }
          />
        </div>
        <InputField
          label='Title'
          {...productForm.register('title')}
          error={productForm.formState.errors.title?.message}
        />
        <TextareaField
          label='Description'
          {...productForm.register('description')}
          error={productForm.formState.errors.description?.message}
        />
        {isLoading ? null : (
          <Select
            options={data.categories}
            value={productForm.getValues('categoryId')}
            onChange={(id) => {
              productForm.setValue('categoryId', id);
            }}
            label='Select a category'
          />
        )}
        <ErrorMessage
          error={productForm.formState.errors.categoryId?.message}
        />
        <InputField
          label='Price in Dollar'
          type='number'
          {...productForm.register('price')}
          error={productForm.formState.errors.price?.message}
        />
        <InputField
          label='Quantity in Stock'
          type='number'
          {...productForm.register('quantityInStock')}
          error={productForm.formState.errors.quantityInStock?.message}
        />
        <div className='flex items-center py-4 gap-4'>
          <p className='text-xl font-medium'>Published:</p>
          <Toggle
            checked={productForm.getValues('published')}
            onChange={(e) => {
              productForm.setValue('published', e.target.checked);
            }}
          />
        </div>

        <button
          disabled={productForm.formState.isSubmitting}
          className={`bg-sky-400 px-4 py-2 rounded-md shadow-lg 
    text-white font-semibold transition 
    ${
      productForm.formState.isSubmitting
        ? 'bg-sky-300 cursor-not-allowed'
        : 'hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-opacity-50'
    }`}
        >
          Save
        </button>
      </form>
    </div>
  );
};

const Carousel = ({
  medias,
  cb,
}: {
  medias: TProductSchema['medias'];
  cb?: (media: TProductSchema['medias']) => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    'https://via.placeholder.com/300x200?text=Upload Title Image',
  ];

  const goToNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % medias.length);
  };

  const goToPrev = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + medias.length) % medias.length
    );
  };

  const [uploadPhoto] = useUploadPhotoMutation();

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'video/mp4',
      'video/mkv',
    ];

    const file = e.target.files?.[0];

    if (!file || !allowedTypes.includes(file.type)) return;
    const formData = new FormData();
    formData.append('asset', file);
    const res = await uploadPhoto(formData);

    let mediaType: EMediaEnum;
    if (file.type.startsWith('image/')) {
      mediaType = EMediaEnum.IMAGE;
    } else {
      mediaType = EMediaEnum.VIDEO;
    }

    let newMedias = medias.length ? [...medias] : [];

    const newUploadedMedia = {
      url: res.data.url,
      type: mediaType,
      isDefault: false,
      orderNo: medias?.length ? medias.length + 1 : 1,
    };

    newMedias.push(newUploadedMedia);

    cb && cb(newMedias);
  };

  return (
    <div className='w-full max-w-md mx-auto'>
      <div className='overflow-hidden'>
        <div
          className='flex transition-transform duration-300'
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {medias.length ? (
            medias.map((media, index) => (
              <div key={index} className='flex-shrink-0 w-full'>
                <img
                  src={media.url}
                  alt={`Slide ${index + 1}`}
                  className='w-full h-auto aspect-video'
                />
              </div>
            ))
          ) : (
            <div className='flex-shrink-0 w-full'>
              <img src={slides[0]} alt={`Slide`} className='w-full h-auto' />
            </div>
          )}
        </div>
      </div>
      <div className='flex justify-between mt-4'>
        <button
          onClick={goToPrev}
          disabled={currentIndex === 0}
          className={`px-4 py-2 rounded-lg 
            ${
              currentIndex === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
        >
          Prev
        </button>
        <FileInputButton onChange={handleFileUpload} />
        <button
          onClick={goToNext}
          disabled={currentIndex === medias.length - 1}
          className={`px-4 py-2 rounded-lg 
            ${
              currentIndex === medias.length - 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const FileInputButton = ({
  onChange,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className='relative inline-block'>
      <input
        type='file'
        id='fileInput'
        className='absolute inset-0 opacity-0 cursor-pointer'
        onChange={onChange}
        accept='image/*'
        multiple={false}
      />
      <label
        htmlFor='fileInput'
        className='inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg cursor-pointer hover:bg-blue-600'
      >
        Upload File
      </label>
    </div>
  );
};

export const ProductEditForm = () => {
  const { productId } = useParams();

  const { data, isLoading } = useGetProductDetailsQuery(productId);
  if (isLoading) return null;

  return <ProductForm product={data.product} />;
};

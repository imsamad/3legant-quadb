import { z } from 'zod';

// Enum for Media Types
export enum EMediaEnum {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
}

export enum ECurrencySymbol {
  INR = 'INR',
}

const MediaEnum = z.nativeEnum(EMediaEnum);
const CurrencyEnum = z.nativeEnum(ECurrencySymbol);

// Login Schema
export const LoginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a valid string',
    })
    .trim()
    .email('Please enter a valid email address'),

  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a valid string',
    })
    .trim()
    .min(1, { message: 'Password cannot be empty' }),
});

export type TLoginSchema = z.infer<typeof LoginSchema>;

// Signup Schema
export const SignUpSchema = LoginSchema.pick({ email: true }).merge(
  z.object({
    fullName: z
      .string({
        required_error: 'Full name is required',
        invalid_type_error: 'Full name must be a valid string',
      })
      .trim()
      .min(5, { message: 'Full name must be at least 5 characters long' }),

    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a valid string',
      })
      .trim()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            'Password must include an uppercase letter, a lowercase letter, a digit, and a special character',
        }
      ),
  })
);
export type TSignupSchema = z.infer<typeof SignUpSchema>;

// OTP Schema
export const OTPSchema = z.object({
  otp: z
    .string({
      required_error: 'OTP is required',
      invalid_type_error: 'OTP must be a valid string',
    })
    .trim()
    .min(1, { message: 'OTP cannot be empty' }),
});
export type TOtpSchema = z.infer<typeof OTPSchema>;

// ObjectId Validation
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const ObjectIdFormatSchema = z
  .string()
  .trim()
  .refine((value) => objectIdRegex.test(value), {
    message:
      'Invalid ObjectID format. ObjectID must be a 24-character hexadecimal string',
  });

export type TObjectIdFormatSchema = z.infer<typeof ObjectIdFormatSchema>;

export const ObjectIdParamSchema = (paramName: string) =>
  z.object({
    [paramName]: ObjectIdFormatSchema,
  });

// Product Dimension Schema
const ProductDimensionSchema = z.object({
  length: z.coerce
    .number()
    .nonnegative({ message: 'Length must be a non-negative number' }),
  width: z.coerce
    .number()
    .nonnegative({ message: 'Width must be a non-negative number' }),
  height: z.coerce
    .number()
    .nonnegative({ message: 'Height must be a non-negative number' }),
  weight: z.coerce
    .number()
    .nonnegative({ message: 'Weight must be a non-negative number' }),
});

// Table Props Schema
const TablePropsSchema = z.object({
  key: z
    .string({
      required_error: 'Key is required',
    })
    .trim()
    .min(1, { message: 'Key cannot be empty' }),

  value: z
    .string({
      required_error: 'Value is required',
    })
    .trim()
    .min(1, { message: 'Value cannot be empty' }),
});

// Media Schema
const MediaSchema = z.object({
  url: z
    .string()
    .trim()
    .url('Please provide a valid URL for media')
    .min(1, { message: 'URL is required' }),
  type: MediaEnum,
  isDefault: z.boolean().default(false),
  orderNo: z.coerce
    .number()
    .nonnegative({ message: 'Order number must be a non-negative integer' }),
});

export type TMediaSchema = z.infer<typeof MediaSchema>;

// Product Schema
export const ProductSchema = z.object({
  id: z.string().trim().min(1, { message: 'ID cannot be empty' }).optional(),
  title: z
    .string({
      required_error: 'Title is required',
    })
    .trim()
    .min(1, { message: 'Title cannot be empty' }),
  categoryId: ObjectIdFormatSchema,
  description: z
    .string({
      required_error: 'Description is required',
    })
    .trim()
    .min(1, { message: 'Description cannot be empty' }),

  price: z.coerce
    .number({
      required_error: 'Price is required!',
      invalid_type_error: 'Price is required',
    })
    .nonnegative({ message: 'Price must be a non-negative number' })
    .min(1),

  dimension: ProductDimensionSchema.optional(),
  published: z.boolean().default(false),

  quantityInStock: z.coerce
    .number()
    .nonnegative({
      message: 'Quantity in stock must be a non-negative number',
    })
    .min(1),

  tableProps: z.array(TablePropsSchema).optional(),

  medias: z
    .array(MediaSchema)
    .nonempty()
    .min(1, { message: 'At least one media item is required' }),
});
// .strict();

export type TTablePropsSchema = z.infer<typeof TablePropsSchema>;
export type TProductSchema = z.infer<typeof ProductSchema>;

// Phone Number Format Schema
export const PhoneNumberFormatSchema = z
  .string()
  .trim()
  .min(10, { message: 'Phone number must be at least 10 digits long' })
  .max(15, { message: 'Phone number cannot exceed 15 digits' })
  .regex(/^\+?[1-9]\d{1,14}$/, {
    message:
      'Phone number must be in valid international format (e.g., +1234567890)',
  });

// Address Schema
export const AddressSchema = z.object({
  isDefault: z.boolean().default(false),

  firstName: z
    .string({
      required_error: 'First name is required',
    })
    .trim()
    .min(1, { message: 'First name cannot be empty' }),

  lastName: z
    .string({
      required_error: 'Last name is required',
    })
    .trim()
    .min(1, { message: 'Last name cannot be empty' }),

  streetAddress: z
    .string({
      required_error: 'Street address is required',
    })
    .trim()
    .min(1, { message: 'Street address cannot be empty' }),

  country: z
    .string({
      required_error: 'Country is required',
    })
    .trim()
    .min(1, { message: 'Country cannot be empty' }),

  city: z
    .string({
      required_error: 'City is required',
    })
    .trim()
    .min(1, { message: 'City cannot be empty' }),

  state: z
    .string({
      required_error: 'State is required',
    })
    .trim()
    .min(1, { message: 'State cannot be empty' }),

  zipCode: z
    .string({
      required_error: 'Zip code is required',
    })
    .trim()
    .min(1, { message: 'Zip code cannot be empty' }),

  phoneNumber: z
    .string()
    .regex(/^\d+$/, { message: 'Phone number must contain only digits' }),

  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .min(1, { message: 'Email cannot be empty' }),
});

export type TAddressSchema = z.infer<typeof AddressSchema>;

// Order Item Schema
export const OrderItemSchema = z.object({
  productId: ObjectIdFormatSchema,

  quantity: z.number().int().min(1, { message: 'Quantity must be at least 1' }),
});

// Order Schema
export const OrderSchema = z.object({
  items: z
    .array(OrderItemSchema)
    .nonempty({ message: 'Order must contain at least one item' }),

  paymentMode: z.enum(['COD', 'ONLINE'], {
    required_error: 'Payment mode is required',
  }),

  address: AddressSchema,
});

export type TOrderSchema = z.infer<typeof OrderSchema>;
export type TOrderItemSchema = z.infer<typeof OrderItemSchema>;

export const CategorySchema = z.object({
  id: ObjectIdFormatSchema,
  title: z.string().min(1, 'Title is required'),
});

export type TCategorySchema = z.infer<typeof CategorySchema>;

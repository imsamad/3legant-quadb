import { useEffect, useState } from 'react';
import { Modal } from './Modal';
import { Checkbox } from './Checkbox';
import { useChangeOrderStatusMutation } from '../redux/slices/orderSlice';

export function OrderStatusModal({ order }: { order: any }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [statuses, setStatused] = useState<string[]>([]);
  const [changeStatusesApi] = useChangeOrderStatusMutation();
  useEffect(() => {
    if (order) {
      let st = [];
      if (order.cancelledAt) {
        st.push('cancelledAt');
      }
      if (order.outOfDeliveryAt) {
        st.push('outOfDeliveryAt');
      }
      if (order.deliveredAt) {
        st.push('deliveredAt');
      }

      setStatused(st);
    }
  }, [order]);
  const handleSubmit = async () => {
    if (!statuses.length) return;

    try {
      const res = await changeStatusesApi({ orderId: order.id, statuses });
      setIsOpen(false);
    } catch (error) {}
  };

  const handleChange = (status: string) => {
    if (statuses?.includes(status)) {
      let tmp = statuses.filter((p) => p != status);
      setStatused(tmp);
    } else {
      setStatused((p) => [...p, status]);
    }
  };
  return (
    <>
      {/* Toggle Modal Button */}
      <button
        onClick={toggleModal}
        className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        type='button'
      >
        Change Status
      </button>

      {/* Generic Modal */}
      <Modal
        isOpen={isOpen}
        toggleModal={toggleModal}
        title='Change Statuses'
        footer={
          <>
            <button
              onClick={toggleModal}
              className='py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
            >
              Close
            </button>
            <button
              onClick={handleSubmit}
              className='text-white ml-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Submit
            </button>
          </>
        }
      >
        <h1 className='text-red-600 font-bold text-xl mb-4'>
          Warning: Be cautious while making changes to the order status!
        </h1>
        <Checkbox
          label='Cancelled'
          checked={!!statuses?.includes('cancelledAt')}
          onChange={(e) => {
            handleChange('cancelledAt');
          }}
        />
        <Checkbox
          label='Out Of Delivery'
          checked={!!statuses?.includes('outOfDeliveryAt')}
          onChange={(e) => {
            handleChange('outOfDeliveryAt');
          }}
        />
        <Checkbox
          label='Delivered'
          checked={!!statuses?.includes('deliveredAt')}
          onChange={(e) => {
            handleChange('deliveredAt');
          }}
        />
      </Modal>
    </>
  );
}

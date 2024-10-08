import { Box, IndianRupee, PackagePlus, Text, Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Button from '../../../ui/Button';
import FormInput from '../../../ui/FormInput';
import Input from '../../../ui/Input';
import InputIcon from '../../../ui/InputIcon';
import { useCreateProduct } from '../hooks/useCreateProduct';

const categories = [
  'jeans',
  't-shirts',
  'shoes',
  'glasses',
  'jackets',
  'suits',
  'bags',
];

export default function CreateProductForm() {
  const { createProduct, isLoading } = useCreateProduct();
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    const image = data.image[0];
    createProduct({ ...data, image }, { onSettled: reset() });
  }

  return (
    <div className='mx-4 flex w-full flex-col justify-center rounded-md bg-yellow-100 px-8 py-12 sm:w-2/3 lg:w-2/5 lg:px-16'>
      <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label='Product Name'
          htmlFor='productName'
          error={errors?.productName?.message}
        >
          <InputIcon icon={Box} />
          <Input
            type='text'
            placeholder='e.g., Nike Air Max'
            id='productName'
            disabled={isLoading}
            {...register('productName', {
              required: 'This field is required',
            })}
          />
        </FormInput>
        <FormInput
          label='Description'
          htmlFor='description'
          error={errors?.description?.message}
        >
          <InputIcon icon={Text} />
          <textarea
            placeholder='e.g., High-quality running shoes'
            rows='3'
            name='description'
            disabled={isLoading}
            className='block w-full rounded-md border border-yellow-800 bg-yellow-50 px-10 py-2 text-xs placeholder-yellow-700 shadow-sm focus:border-orange-600 focus:outline-none focus:ring-yellow-900 sm:text-sm'
            {...register('description', {
              required: 'This field is required',
            })}
          />
        </FormInput>
        <FormInput label='Price' htmlFor='price' error={errors?.price?.message}>
          <InputIcon icon={IndianRupee} />
          <Input
            type='number'
            id='price'
            step='0.01'
            disabled={isLoading}
            placeholder='e.g., 1999.99'
            {...register('price', { required: 'This field is required' })}
          />
        </FormInput>

        <FormInput
          label='Category'
          htmlFor='category'
          error={errors?.category?.message}
        >
          <select
            id='category'
            name='category'
            disabled={isLoading}
            className='mt-1 block w-full rounded-md border border-yellow-100 bg-orange-600 px-3 py-2 text-xs text-yellow-50 shadow-sm focus:border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-100 sm:text-sm'
            {...register('category', { required: 'This field is required' })}
          >
            <option value=''>Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </FormInput>

        <FormInput label='Image' htmlFor='image' error={errors?.image?.message}>
          <InputIcon icon={Upload} />
          <Input
            type='file'
            id='image'
            accept='image/*'
            disabled={isLoading}
            {...register('image', { required: 'This field is required' })}
          />
        </FormInput>

        <Button type='submit' disabled={isLoading}>
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <>
              <PackagePlus className='mr-2 h-5 w-5' />{' '}
              <span>Create Product</span>
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

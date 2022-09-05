import { ComponentStory, ComponentMeta } from '@storybook/react';
import OpenseaSymbol from 'assets/opensea-symbol.svg';
import { useAppDispatch } from 'hooks/store';
import useTimeout from 'hooks/useTimeout';
import { RegisterFields } from 'interfaces/form';
import { useForm } from 'react-hook-form';
import { setRegisterStage } from 'store/modules/modal';
import RegisterModal from '.';

export default {
  title: 'Organism/RegisterModal',
  component: RegisterModal,
  args: {
    serviceSymbol: <OpenseaSymbol width={48} height={48} />,
    isOpen: false,
  },
} as ComponentMeta<typeof RegisterModal>;

const Template: ComponentStory<typeof RegisterModal> = (args) => {
  const dispatch = useAppDispatch();
  const { register, watch, formState: { errors } } = useForm<RegisterFields>({
    defaultValues: {
      email: '',
      verificationCode: '',
      password: '',
      passwordConfirmation: '',
    },
  });
  useTimeout(() => {
    dispatch(setRegisterStage('password'));
  }, watch('verificationCode').length === 6 ? 500 : null);
  return (
    <div>
      <RegisterModal {...args}>
        <RegisterModal.Login register={register} watch={watch} errors={errors} onClickButton={() => dispatch(setRegisterStage('verification'))} />
        <RegisterModal.Verification register={register} watch={watch} errors={errors} onClickButton={() => dispatch(setRegisterStage('password'))} />
        <RegisterModal.Password register={register} watch={watch} errors={errors} onClickButton={() => dispatch(setRegisterStage('success'))} />
        <RegisterModal.Success />
      </RegisterModal>
    </div>
  );
};

export const Default = Template.bind({});
Default.argTypes = {
  onClose: {
    action: 'closed',
  },
  initialStage: {
    control: {
      type: 'select',
      options: ['login', 'verification', 'password', 'success'],
    },
  },
};

Default.args = {
  initialStage: 'login',
};

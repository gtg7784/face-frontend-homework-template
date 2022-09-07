import { useForm } from 'react-hook-form';
import { PropsWithChildren } from 'react';
import Input from 'components/atom/Input';
import { renderWithTheme } from 'testing-library';
import { RegisterFields } from 'interfaces/form';

interface IPropsWithoutUseForm {
  disabled?: boolean;
  value?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  onClick?: () => void;
}

const InputWithUseForm = (props: PropsWithChildren<IPropsWithoutUseForm>) => {
  const { register } = useForm<RegisterFields>();

  return <Input {...register('email')} {...props} />;
};

describe('components/atom/Input', () => {
  it('should render', () => {
    const { queryByTestId } = renderWithTheme(<InputWithUseForm />, {});

    expect(queryByTestId('components/atom/Input')).toBeInTheDocument();
  });

  it('should render when disabled', () => {
    const { queryByTestId } = renderWithTheme(<InputWithUseForm disabled />, {});

    expect(queryByTestId('components/atom/Input')).toHaveAttribute('disabled');
  });

  it('should render when has children', () => {
    const { queryByTestId } = renderWithTheme(<InputWithUseForm>children</InputWithUseForm>, {});

    expect(queryByTestId('components/atom/Input/RightSection')).toBeInTheDocument();
    expect(queryByTestId('components/atom/Input/RightSection')).toHaveTextContent('children');
  });

  it('should render when has value', () => {
    const { queryByTestId } = renderWithTheme(<InputWithUseForm value="value" />, {});

    expect(queryByTestId('components/atom/Input/Input')).toHaveValue('value');
  });

  it('should render when has placeholder', () => {
    const { queryByTestId } = renderWithTheme(<InputWithUseForm placeholder="placeholder" />, {});

    expect(queryByTestId('components/atom/Input/Input')).toHaveAttribute('placeholder', 'placeholder');
  });

  it('should render when has type', () => {
    const { queryByTestId } = renderWithTheme(<InputWithUseForm type="password" />, {});

    expect(queryByTestId('components/atom/Input/Input')).toHaveAttribute('type', 'password');
  });
});

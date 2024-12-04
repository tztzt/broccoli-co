import { useState } from 'react';

import { Button, Input } from '../../components';
import { submitRequestInvite } from '../../services/submitRequestInvite';
import { PostRequestInvite } from '../../types';

type ExtendedPostRequestInvite = PostRequestInvite & {
  confirmEmail: PostRequestInvite['email']; // Infers the type of confirmEmail from the email field
};

type PartialInputFormValue = Partial<ExtendedPostRequestInvite>;

interface UserEmailFormProps {
  onSuccess: () => void;
  onSubmitError: (message: string) => void;
}

export const UserEmailForm = ({
  onSuccess,
  onSubmitError,
}: UserEmailFormProps) => {
  const [formState, setFormState] = useState<PartialInputFormValue>({});
  const [errors, setErrors] = useState<PartialInputFormValue>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (
    value: string,
    field: keyof ExtendedPostRequestInvite,
  ) => {
    setErrors((_prevError) => {
      const prevError = { ..._prevError };
      delete prevError[field];
      return prevError;
    });
    setFormState((s) => ({ ...s, [field]: value }));
  };

  const clearState = () => {
    setFormState({});
    setErrors({});
  };

  const handleSuccess = () => {
    onSuccess();
    clearState();
  };

  const validate = () => {
    const { name, email, confirmEmail } = formState;
    const newErrors: PartialInputFormValue = {};
    if (!name) newErrors.name = 'Please fill in your name';
    else if (name.length < 3)
      newErrors.name = 'Please ensure your name is at least 3 characters long';

    const emailRegexCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) newErrors.email = 'Please fill in your email';
    else if (!emailRegexCheck.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (email !== confirmEmail) {
      newErrors.confirmEmail =
        'Please check if your email was entered correctly';
    }

    return newErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    const { name, email } = formState;
    if (!name || !email) return;
    const requestParams: PostRequestInvite = {
      name,
      email,
    };

    await submitRequestInvite(requestParams)
      .then(() => {
        // no operations necessary, as long as API indicated success
        handleSuccess();
      })
      .catch((e) => {
        onSubmitError(e.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const SubmitButton = () => {
    return (
      <Button type="submit" loading={isSubmitting} block>
        Submit
      </Button>
    );
  };

  return (
    <div className="flex flex-col gap-16">
      <form onSubmit={handleSubmit} className="space-y-16">
        <div className="space-y-4">
          <Input<keyof ExtendedPostRequestInvite>
            placeholder="Full Name"
            fieldName={'name' as keyof ExtendedPostRequestInvite}
            onChange={handleChange}
            error={errors?.name}
          />
          <Input<keyof ExtendedPostRequestInvite>
            placeholder="Email"
            fieldName={'email' as keyof ExtendedPostRequestInvite}
            onChange={handleChange}
            error={errors?.email}
          />
          <Input<keyof ExtendedPostRequestInvite>
            placeholder="Confirm email"
            fieldName={'confirmEmail' as keyof ExtendedPostRequestInvite}
            onChange={handleChange}
            error={errors?.confirmEmail}
          />
        </div>
        <SubmitButton />
      </form>
    </div>
  );
};

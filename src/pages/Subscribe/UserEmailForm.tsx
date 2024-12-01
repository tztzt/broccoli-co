import { useState } from 'react';

import { Button, Input } from '../../components';
import { submitRequestInvite } from '../../services/submitRequestInvite';
import { PostRequestInvite } from '../../types';

type ExtendedPostRequestInvite = PostRequestInvite & {
  confirmEmail: PostRequestInvite['email']; // Infers the type of confirmEmail from the email field
};

type PartialInputFormValue = Partial<ExtendedPostRequestInvite>;

interface UserEmailFormProps {
  handleSuccess: () => void;
  handleError: (show: boolean, message: string) => void;
}

export const UserEmailForm = ({
  handleSuccess,
  handleError,
}: UserEmailFormProps) => {
  const [formState, setFormState] = useState<PartialInputFormValue>({});
  const [errors, setErrors] = useState<PartialInputFormValue>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const updateForm = (
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

  const handleSubmit = async () => {
    const { name, email, confirmEmail } = formState;
    const newErrors: PartialInputFormValue = {};
    if (!name) newErrors.name = 'Name cannot be empty';
    else if (name.length < 3) newErrors.name = 'Name is too short';

    const emailRegexCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) newErrors.email = 'Email cannot be empty';
    else if (!emailRegexCheck.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (email !== confirmEmail) {
      newErrors.confirmEmail = 'Emails do not match';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0 || !name || !email) {
      // handle the error
      return;
    }

    setIsSubmitting(true);
    const requestParams: PostRequestInvite = { name, email };
    await submitRequestInvite(requestParams)
      .then((resp) => {
        console.log('Success: ', resp);
        handleSuccess();
        return resp;
      })
      .catch((e) => {
        console.error(e.message);
        handleError(true, e.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Full Name"
            fieldName={'name' as keyof ExtendedPostRequestInvite}
            value={formState?.name}
            onChange={(value) => updateForm(value, 'name')}
            error={errors?.name}
          />
          <Input
            placeholder="Email"
            fieldName={'email' as keyof ExtendedPostRequestInvite}
            value={formState?.email}
            onChange={(value) => updateForm(value, 'email')}
            error={errors?.email}
          />
          <Input
            placeholder="Confirm email"
            fieldName={'confirmEmail' as keyof ExtendedPostRequestInvite}
            value={formState?.confirmEmail}
            onChange={(value) => updateForm(value, 'confirmEmail')}
            error={errors?.confirmEmail}
          />
        </div>
        <Button onClick={handleSubmit} loading={isSubmitting}>
          Submit
        </Button>
      </div>
    </>
  );
};

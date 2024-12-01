import { useMemo, useState } from "react";
import { Button, Input, Modal } from "../../components";

type InputFormState = {
  name: string;
  email: string;
  confirmEmail: string;
};

type PartialInputFormValue = Partial<InputFormState>;

export const UserInputModal = () => {
  const [visible, setVisible] = useState(false);
  const [formState, setFormState] = useState<PartialInputFormValue>({});
  const [errors, setErrors] = useState<PartialInputFormValue>({});

  const updateForm = (value: string, field: keyof InputFormState) => {
    setErrors((_prevError) => {
      const prevError = { ..._prevError };
      delete prevError[field];
      return prevError;
    });
    setFormState((s) => ({ ...s, [field]: value }));
  };

  const handleSubmit = () => {
    const { name, email, confirmEmail } = formState;
    const newErrors: PartialInputFormValue = {};
    if (!name) newErrors.name = "Name cannot be empty";
    if (!name) newErrors.email = "Email cannot be empty";
    if (!name) newErrors.email = "Email cannot be empty";
    if (email !== confirmEmail) {
      newErrors.confirmEmail = "Emails do not match";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    // call API
  };

  const handleClickRequestInvite = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const content = useMemo(() => {
    return (
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Full Name"
            fieldName={"name" as keyof InputFormState}
            value={formState?.name}
            onChange={(value) => updateForm(value, "name")}
            error={errors?.name}
          />
          <Input
            placeholder="Email"
            fieldName={"email" as keyof InputFormState}
            value={formState?.email}
            onChange={(value) => updateForm(value, "email")}
            error={errors?.email}
          />
          <Input
            placeholder="Confirm email"
            fieldName={"confirmEmail" as keyof InputFormState}
            value={formState?.confirmEmail}
            onChange={(value) => updateForm(value, "confirmEmail")}
            error={errors?.confirmEmail}
          />
        </div>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    );
  }, [formState, errors]);

  return (
    <>
      <Button onClick={handleClickRequestInvite}>Request an invite</Button>
      <Modal
        title="Request an invite"
        visible={visible}
        onClose={handleClose}
        content={content}
      />
    </>
  );
};

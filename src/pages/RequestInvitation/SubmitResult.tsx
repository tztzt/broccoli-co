import { Button } from '../../components';

interface SubmitResultProps {
  handleClose: () => void;
}

export const SubmitResult = ({ handleClose }: SubmitResultProps) => {
  return (
    <div className="flex flex-col gap-16">
      <p className="text-mobile-sm md:text-desktop-sm">
        You will be one of the first to experience Broccoli & Co. when we
        launch!
      </p>
      <Button onClick={handleClose} block>
        Ok
      </Button>
    </div>
  );
};

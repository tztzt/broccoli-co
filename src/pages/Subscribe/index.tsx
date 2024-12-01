import { UserInputModal } from "./UserInputModal";

export const SubscribeInvitation = () => {
  return (
    <div className="container flex flex-col mx-auto py-8 w-1/2 h-1/2 text-center items-center content-center min-w-80 gap-4">
      <h2 className="text-mobile-lg md:text-desktop-lg font-semibold mb-4">
        A better way <br /> to enjoy every day.
      </h2>
      <p className="text-mobile-sm md:text-desktop-sm">
        Be the first to know when we launch!
      </p>

      <UserInputModal />
    </div>
  );
};

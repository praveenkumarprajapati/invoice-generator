import { useSelector } from "react-redux";
import Alert from "./Alert";
import { notificationSelector } from "../slices/notificationSlice";

export const NotificationProvider: React.FC = () => {
  const notification = useSelector(notificationSelector);
  return (
    <>
      {notification.visible && (
        <Alert
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
        />
      )}
    </>
  );
};

import React, { useState } from "react";

const NotificationSettings = () => {
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);

  return (
    <div>
      <label>
        Email Notifications
        <input type="checkbox" checked={email} onChange={() => setEmail(!email)} />
      </label>

      <label>
        SMS Notifications
        <input type="checkbox" checked={sms} onChange={() => setSms(!sms)} />
      </label>
    </div>
  );
};

export default NotificationSettings;

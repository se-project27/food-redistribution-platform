import React, { useState } from "react";

const NotificationSettings = () => {
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);

  return (
    <div>
      <h3>Notifications</h3>
      <label>
        Email
        <input type="checkbox" checked={email} onChange={() => setEmail(!email)} />
      </label>

      <label>
        SMS
        <input type="checkbox" checked={sms} onChange={() => setSms(!sms)} />
      </label>
    </div>
  );
};

export default NotificationSettings;

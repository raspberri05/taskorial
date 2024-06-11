"use client";

import { UserProfile } from "@clerk/nextjs";

const DotIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  );
};

const RequestData = () => {
  return (
    <div>
      <h1>Request your data</h1>
    </div>
  );
};

const DangerZone = () => {
  return (
    <div>
      <h1>Delete Account</h1>
    </div>
  );
};

const UserProfilePage = () => (
  <div className="flex justify-center">
    <UserProfile path="/user-profile" routing="path">
      {/* You can pass the content as a component */}
      <UserProfile.Page
        label="Request Data"
        labelIcon={<DotIcon />}
        url="request-data"
      >
        <RequestData />
      </UserProfile.Page>

      <UserProfile.Page
        label="Danger Zone"
        labelIcon={<DotIcon />}
        url="danger-zone"
      >
        <DangerZone />
      </UserProfile.Page>
    </UserProfile>
  </div>
);

export default UserProfilePage;

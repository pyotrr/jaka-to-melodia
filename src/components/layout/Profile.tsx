import React, { useCallback, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  Profile as ProfileStyled,
  ProfileMenu,
  ProfileContainer,
} from "../../styles/components/Profile.styled";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdLogout, MdLogin } from "react-icons/md";
import useOutsideClick from "../../utils/hooks/useOutsideClick";
import api from "../../api";

const disappearKeyframes = [
  { opacity: 1, transform: "scale(100%)" },
  { opacity: 0, transform: "scale(80%)" },
];

const Profile = () => {
  const { userProfile, isLoggedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const profilePicRef = useRef<HTMLButtonElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const closeProfileMenu = useCallback(() => {
    if (!profileMenuRef.current) return;
    const disappearAnimation = profileMenuRef.current.animate(
      disappearKeyframes,
      {
        duration: 150,
        iterations: 1,
      }
    );
    disappearAnimation.onfinish = () => {
      setIsMenuOpen(false);
    };
  }, []);

  useOutsideClick<HTMLButtonElement>(profilePicRef, () => {
    closeProfileMenu();
  });

  return (
    <ProfileContainer>
      <ProfileStyled
        onClick={(e) => {
          e.preventDefault();
          if (isMenuOpen) {
            closeProfileMenu();
            return;
          }
          setIsMenuOpen(true);
        }}
        ref={profilePicRef}
      >
        {isLoggedIn && userProfile ? (
          <img src={userProfile.profilePicUrl} alt={"Profile"} />
        ) : (
          <AiOutlineUser />
        )}
      </ProfileStyled>
      {isMenuOpen && (
        <ProfileMenu ref={profileMenuRef}>
          {isLoggedIn ? (
            <>
              <Link to={"/jaka-to-melodia/logout"}>
                <MdLogout />
                <div>Logout</div>
              </Link>
            </>
          ) : (
            <>
              <a href={api.Auth.authorizeLink()}>
                <MdLogin />
                <div>Log in</div>
              </a>
            </>
          )}
        </ProfileMenu>
      )}
    </ProfileContainer>
  );
};

export default Profile;

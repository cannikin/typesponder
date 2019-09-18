import React from "react";

export default function AuthButton({ currentUser, netlifyAuth }) {
  return currentUser ? (
    <a
      href="/signout"
      className="f6 bg-pwv-red white ph2 pv1 br1 no-underline"
      onClick={e => {
        e.preventDefault();
        netlifyAuth.signout();
      }}>
      Sign out
    </a>
  ) : (
    <a
      href="/signin"
      className="f6 bg-pwv-red white ph2 pv1 br1 no-underline"
      onClick={e => {
        e.preventDefault();
        netlifyAuth.signin();
      }}>
      Sign in
    </a>
  );
}

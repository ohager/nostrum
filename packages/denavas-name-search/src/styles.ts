import { css } from "lit";

export const rootStyles = css`
  .hidden {
    visibility: hidden;
    opacity: 0;
  }
  .visible {
    visibility: visible;
    opacity: 1;
  }

  .inline {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export const inputStyles = css`
  input {
    font: inherit;
    border-radius: 8px;
    border: none;
    padding: 0.25rem 0.75rem;
    font-size: 2rem;
    width: 100%;
  }

  input:invalid {
    border: red solid 2px;
    -webkit-box-shadow: 0 0 15px 0 rgba(235, 18, 18, 1);
    -moz-box-shadow: 0 0 15px 0 rgba(235, 18, 18, 1);
    box-shadow: 0 0 15px 0 rgba(235, 18, 18, 1);
  }
`;

export const loaderStyles = css`
  .loader {
    display: inline-block;
    position: absolute;
    right: 1rem;
    width: 2rem;
    height: 2rem;
  }

  .loader div {
    position: absolute;
    border: 2px solid #999;
    opacity: 1;
    border-radius: 50%;
    animation: ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  .loader div:nth-child(2) {
    animation-delay: -0.5s;
  }

  @keyframes ripple {
    0% {
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      opacity: 0;
    }
    4.9% {
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      opacity: 0;
    }
    5% {
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
`;

export const errorStyles = css`
  .error {
    color: darkred;
    font-size: 75%;
    text-align: left;
  }
`;

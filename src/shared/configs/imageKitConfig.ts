import { IKCore, } from "imagekitio-react";

export const imageKitConfig= {
  urlEndpoint: "https://ik.imagekit.io/yschool",
  publicKey: "public_TatTyIBt18yMljbpEbb1BgmYCpY=",
  authenticationEndpoint: "https://localhost:5000/image-auth",
};

export const imageKit = new IKCore(imageKitConfig);

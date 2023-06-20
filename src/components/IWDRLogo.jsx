import Image from "next/image";
import iwdr_img from "@/images/iwdr-logo-new-copy.png"

export function IWDRLogo(props) {
  return (
      <Image src={iwdr_img} alt="IWDR Logo" className={props.className} />
  )
}

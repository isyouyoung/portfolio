import { Github, Mail, Globe, Youtube, Instagram, MessageCircle } from "lucide-react";

/**
 * 자주 쓰는 소셜/링크 아이콘 모음.
 * 새 SNS 아이콘이 필요하면 여기에 추가하고 resume.js에서 참조한다.
 */
export const Icons = {
  github: (props) => <Github {...props} />,
  email: (props) => <Mail {...props} />,
  globe: (props) => <Globe {...props} />,
  youtube: (props) => <Youtube {...props} />,
  instagram: (props) => <Instagram {...props} />,
  kakao: (props) => <MessageCircle {...props} />,
};

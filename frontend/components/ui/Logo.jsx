import Link from 'next/link';
import Image from 'next/image';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src="/UrsSkill-logo.png"
        alt="Urs Skill Logo"
        width={180}
        height={30}
        className="w-60 h-10 hover:cursor-pointer"
      />
    </Link>
  );
};

export default Logo;

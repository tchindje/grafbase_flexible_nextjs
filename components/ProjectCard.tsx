import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  id: string;
  image: string;
  title: string;
  name: string;
  avatarUrl: string;
  userId: string;
};

const ProjectCard = ({ id, image, title, name, avatarUrl, userId }: Props) => {
  return (
    <div className='flexCenter flex-col rounded-2xl drop-shadow-sm-card'>
      <Link
        href={`/project/${id}`} //link to de project detail
        className='flexCenter group relative w-full h-full'>
        <Image
          src={image}
          width={414}
          height={314}
          className='w-full h-full object-cover rounded-2xl '
          alt='Project Image'
        />
        <div className='hidden group-hover:flex profile_card-title'>
          <p>{title}</p>
        </div>

        <div className='flexBetween w-full px-2 mt-2 font-semibold text-sm'>
          <Link href={`/profile/${userId}`}>
            <div className='fexCenter gap-2'>
              <Image
                src={avatarUrl}
                width={24}
                height={24}
                className='rounded-full'
                alt='Profile Image'
              />
            </div>
          </Link>
          <div className='flexCenter gap-3 '>
            <div className='flexCenter gap-2'>
              <Image src='/hearth.svg' alt='hear' width={13} height={12} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;

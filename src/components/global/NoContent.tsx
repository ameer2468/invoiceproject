import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface props {
  link: string;
  buttonText: string;
  content: string;
  image: string;
  title: string;
}

const NoContent = ({ link, buttonText, content, image, title }: props) => {
  return (
    <div className="noContent">
      <div
        style={{
          width: '100%',
          maxWidth: '25rem',
          margin: '0 auto 3rem auto',
        }}
      >
        <Image src={image} layout="responsive" quality={100} />
      </div>
      <h2>{title}</h2>
      <p>{content}</p>
      <Link passHref={true} href={link}>
        <button className="button">{buttonText}</button>
      </Link>
    </div>
  );
};

export default NoContent;

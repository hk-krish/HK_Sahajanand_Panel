import { ImagePath } from "@/Constant";
import { ProductImageProps } from "@/Types/CoreComponents";
import RatioImage from "@/Utils/RatioImage";
import { FC, Fragment } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ProductImage: FC<ProductImageProps> = ({ image }) => {
  const images = Array.isArray(image) ? image : [image];

  const ProductImageSetting = {
    slidesPerView: 1,
    spaceBetween: 10,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    loop: true,
    effect: "fade",
    modules: [Autoplay, EffectFade],
  };

  return (
    <Fragment>
      <Swiper {...ProductImageSetting}>
        {images.map((imgSrc, idx) => (
          <SwiperSlide key={idx}>
            <RatioImage src={imgSrc ? imgSrc : `${ImagePath}product/compare-1.jpg`} alt={`product-${idx}`} className="img-fluid-box w-100" />
          </SwiperSlide>
        ))}
      </Swiper>
    </Fragment>
  );
};

export default ProductImage;

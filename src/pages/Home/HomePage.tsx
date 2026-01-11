import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProfile } from "../../features/profile/profileSlice";
import { fetchBalance } from "../../features/balance/balanceSlice";
import { fetchBanner } from "../../features/banner/bannerSlice";
import { fetchServices } from "../../features/services/serviceSlice";
import { useNavigate } from "react-router-dom";
import GreetingBalanceCard from "../../components/GreetingBalanceCard";
import LoadingSpinner from "../../components/LoadingSpinner";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const profile = useAppSelector((state) => state.profile);
  const balance = useAppSelector((state) => state.balance);
  const banner = useAppSelector((state) => state.banner);
  const services = useAppSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
    dispatch(fetchBanner());
    dispatch(fetchServices());
  }, [dispatch]);

  if (profile.loading || balance.loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="pb-8">
      <GreetingBalanceCard />

      <section className="mt-8">
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-6 text-center">
          {services.list.map((service) => (
            <div
              key={service.service_code}
              onClick={() => navigate(`/payment/${service.service_code}`)}
              className="flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition"
            >
              <div className="flex items-center justify-center">
                <img
                  src={service.service_icon}
                  alt={service.service_name}
                  className="w-14 rounded-xl"
                />
              </div>

              <p className="text-xs text-gray-700">{service.service_name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h3 className="font-semibold mb-6 text-lg md:text-xl">
          Temukan promo menarik
        </h3>

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1.3,
              },
              768: {
                slidesPerView: 1.8,
              },
              1024: {
                slidesPerView: 2.3,
              },
              1280: {
                slidesPerView: 2.8,
              },
            }}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
              bulletClass: "custom-bullet",
              bulletActiveClass: "custom-bullet-active",
            }}
            autoplay={{
              delay: 4000,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            className="rounded-2xl"
          >
            {banner.list.map((item) => (
              <SwiperSlide key={item.banner_name}>
                <div className="relative h-48 md:h-56 lg:h-64 rounded-2xl overflow-hidden group">
                  <img
                    src={item.banner_image}
                    alt={item.banner_name}
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent rounded-2xl"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="custom-prev absolute left-2 top-[45%] -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button className="custom-next absolute right-2 top-[45%] -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <div className="custom-pagination flex justify-center gap-2 mt-6"></div>
        </div>
      </section>
    </div>
  );
}

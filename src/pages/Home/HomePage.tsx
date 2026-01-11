import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProfile } from "../../features/profile/profileSlice";
import { fetchBalance } from "../../features/balance/balanceSlice";
import { fetchBanner } from "../../features/banner/bannerSlice";
import { fetchServices } from "../../features/services/serviceSlice";
import { useNavigate } from "react-router-dom";
import GreetingBalanceCard from "../../components/GreetingBalanceCard";
import LoadingSpinner from "../../components/LoadingSpinner";

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
    <div>
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
        <h3 className="font-semibold mb-4">Temukan promo menarik</h3>

        <div className="flex gap-4 overflow-x-auto pb-4">
          {banner.list.map((item) => (
            <img
              key={item.banner_name}
              src={item.banner_image}
              alt={item.banner_name}
              className="h-36 rounded-xl shrink-0"
            />
          ))}
        </div>
      </section>
    </div>
  );
}

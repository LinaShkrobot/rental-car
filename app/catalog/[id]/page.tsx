import CarDetails from "@/components/CarDetails/CarDetails";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CarPage({ params }: Props) {
  const { id } = await params;
  return <CarDetails id={id} />;
}

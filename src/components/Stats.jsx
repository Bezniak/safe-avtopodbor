const Stats = () => {
  // Динамический расчет количества лет работы (с 2016 года)
  const startYear = 2016;
  const currentYear = new Date().getFullYear();
  const yearsInBusiness = currentYear - startYear;

  const stats = [
    {
      value: `${yearsInBusiness}+`,
      label: "лет на рынке",
      description: "Профессиональный опыт"
    },
    {
      value: "500+",
      label: "довольных клиентов",
      description: "Успешных сделок"
    },
    {
      value: "3",
      label: "вида гарантии",
      description: "Защита покупателя"
    },
    {
      value: "100+",
      label: "параметров проверки",
      description: "Комплексная диагностика"
    }
  ];

  return (
    <section className="py-20 bg-black border-y border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-red-600 transition-all transform hover:scale-105"
            >
              <div className="text-5xl font-bold text-red-600 mb-2">
                {stat.value}
              </div>
              <div className="text-xl font-semibold text-white mb-2">
                {stat.label}
              </div>
              <div className="text-gray-400 text-sm">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

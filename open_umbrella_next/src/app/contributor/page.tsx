import ContributorCard from '@/components/contributor/ContributorCard'

const contributors = {
  donators: [
    { name: 'jmaing', detail: '24.10.24 기부' },
    { name: 'juha', detail: '24.10.24 기부' },
    { name: 'jihokim2', detail: '24.10.24 기부' },
    { name: 'seongyle', detail: '24.10.24 기부' },
    { name: 'sokwon', detail: '24.10.24 기부' },
    { name: 'hhwang', detail: '24.10.24 기부' },
    { name: 'yukim', detail: '24.10.24 기부' },
    { name: 'kiyolee', detail: '24.10.24 기부' }
  ],
  operators: [
    { name: 'seongyle', detail: '24.12.04 노력 기부' },
    { name: 'yonghyle', detail: '24.12.04 노력 기부' },
    { name: 'sunhwang', detail: '24.12.04 노력 기부' },
    { name: 'sooyokim', detail: '24.12.04 노력 기부' },
    { name: 'hhwang', detail: '24.12.04 노력 기부' },
    { name: 'wochae', detail: '24.12.04 노력 기부' },
    { name: 'seonhoki', detail: '24.12.04 노력 기부' },
    { name: 'jaewchoi', detail: '24.12.04 노력 기부' },
    { name: 'juha', detail: '24.12.04 노력 기부' },
    { name: 'jimin', detail: '24.12.04 노력 기부' },
    { name: 'sangmipa', detail: '24.12.04 노력 기부' },
    { name: 'junmoon', detail: '24.12.04 노력 기부' },
    { name: 'sujikim', detail: '24.12.04 노력 기부' },
    { name: 'hyeunkim', detail: '24.12.04 노력 기부' },
    { name: 'dongyenuk', detail: '24.12.04 노력 기부' },
    { name: 'sayoon', detail: '24.12.04 노력 기부' }
  ],
  designers: [
    { name: 'junmoon', detail: '디자인 총괄' }
  ]
}

const ContributorPage = () => {
  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-4xl font-bold">Thanks to</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Operators */}
          {contributors.operators.map((contributor) => (
            <ContributorCard
              key={`operator-${contributor.name}`}
              name={contributor.name}
              role="Operator"
              contributions={contributor.detail}
              cardType="electric"
            />
          ))}
          
          {/* Donators */}
          {contributors.donators.map((contributor) => (
            <ContributorCard
              key={`donator-${contributor.name}`}
              name={contributor.name}
              role="Donator"
              contributions={contributor.detail}
              cardType="psychic"
            />
          ))}
          
          {/* Designers */}
          {contributors.designers.map((contributor) => (
            <ContributorCard
              key={`designer-${contributor.name}`}
              name={contributor.name}
              role="Designer"
              contributions={contributor.detail}
              cardType="fairy"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContributorPage

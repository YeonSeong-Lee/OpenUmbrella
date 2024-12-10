import Image from 'next/image'

interface ContributorCardProps {
  name: string
  role: string
  contributions: string
  cardType: 'electric' | 'psychic' | 'fairy'
  imageUrl?: string
}

const getCardStyles = (cardType: string) => {
  const styles = {
    electric: {
      background: 'from-yellow-50 to-yellow-100',
      border: 'border-yellow-200/30',
      imageGradient: 'from-yellow-400 to-yellow-600',
      ring: 'ring-yellow-50',
      title: 'text-yellow-900',
      role: 'text-yellow-700/90',
      contributions: 'text-yellow-600/80',
      imageBorder: 'ring-yellow-400/50'
    },
    psychic: {
      background: 'from-purple-50 to-purple-100',
      border: 'border-purple-200/30',
      imageGradient: 'from-purple-400 to-purple-600',
      ring: 'ring-purple-50',
      title: 'text-purple-900',
      role: 'text-purple-700/90',
      contributions: 'text-purple-600/80',
      imageBorder: 'ring-purple-400/50'
    },
    fairy: {
      background: 'from-pink-50 to-pink-100',
      border: 'border-pink-200/30',
      imageGradient: 'from-pink-400 to-pink-600',
      ring: 'ring-pink-50',
      title: 'text-pink-900',
      role: 'text-pink-700/90',
      contributions: 'text-pink-600/80',
      imageBorder: 'ring-pink-400/50'
    }
  }
  return styles[cardType as keyof typeof styles]
}

const ContributorCard = ({ name, role, contributions, cardType, imageUrl }: ContributorCardProps) => {
  const styles = getCardStyles(cardType)

  return (
    <div className={`rounded-xl bg-gradient-to-br ${styles.background} p-6 shadow-md hover:shadow-lg transition-all duration-300 border ${styles.border} relative overflow-hidden group`}>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className={`absolute -top-6 -right-6 h-20 w-20 rounded-full bg-gradient-to-br ${styles.imageGradient} opacity-10 transition-transform duration-500 group-hover:scale-110`} />
        <div className={`absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-gradient-to-br ${styles.imageGradient} opacity-10 transition-transform duration-500 group-hover:scale-110`} />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col items-center mb-6">
          <div className={`relative w-32 h-32 mb-4 rounded-full overflow-hidden ring-4 ${styles.imageBorder} transition-all duration-300 group-hover:scale-105`}>
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={`${name}'s profile`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${styles.imageGradient} opacity-50 flex items-center justify-center`}>
                <span className={`text-4xl font-bold text-white/90`}>
                  {name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <h3 className={`text-3xl font-bold ${styles.title} tracking-wide transition-all duration-300 group-hover:tracking-wider text-center`}>
            {name}
          </h3>
        </div>
        <div className={`${styles.role} text-center text-lg font-semibold mb-3 transition-all duration-300 group-hover:scale-105`}>
          {role}
        </div>
        <div className={`${styles.contributions} text-center text-sm mt-2 px-4 py-2 rounded-lg bg-white/50 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/60`}>
          {contributions}
        </div>
      </div>
    </div>
  )
}

export default ContributorCard

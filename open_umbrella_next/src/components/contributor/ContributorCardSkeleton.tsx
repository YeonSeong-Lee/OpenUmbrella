const ContributorCardSkeleton = () => {
  return (
    <div className="rounded-lg bg-gray-800 p-6 animate-pulse">
      <div className="h-24 w-24 rounded-full bg-gray-700 mx-auto mb-4" />
      <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto mb-3" />
      <div className="h-3 bg-gray-700 rounded w-1/2 mx-auto" />
    </div>
  )
}

export default ContributorCardSkeleton
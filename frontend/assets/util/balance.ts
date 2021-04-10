export default function balance(left: string, right: string) {
  const EXCLAIM_WEIGHT = 2
  const QUESTION_WEIGHT = 3

  function calculateWeight(str: string): number {
    const exclaimsWeight = (str.match(/!/g)?.length || 0) * EXCLAIM_WEIGHT
    const questionWeight = (str.match(/\?/g)?.length || 0) * QUESTION_WEIGHT

    return exclaimsWeight + questionWeight
  }

  const leftWeight = calculateWeight(left)
  const rightWeight = calculateWeight(right)

  if (leftWeight > rightWeight) return 'Left'
  if (leftWeight < rightWeight) return 'Right'
  return 'Balance'
}

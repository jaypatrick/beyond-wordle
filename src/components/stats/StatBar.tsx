import { GameStats } from '../../lib/localStorage'
import { Strings } from '../../constants/strings'

type Props = {
  gameStats: GameStats
}

const StatItem = ({
  label,
  value,
}: {
  label: string
  value: string | number
}) => {
  return (
    <div className="items-center justify-center m-1 w-1/4 dark:text-white">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-xs">{label}</div>
    </div>
  )
}

export const StatBar = ({ gameStats }: Props) => {
  return (
    <div className="flex justify-center my-2">
      <StatItem label={Strings.TOTAL_TRIES_TEXT} value={gameStats.totalGames} />
      <StatItem
        label={Strings.SUCCESS_RATE_TEXT}
        value={`${gameStats.successRate}%`}
      />
      <StatItem
        label={Strings.CURRENT_STREAK_TEXT}
        value={gameStats.currentStreak}
      />
      <StatItem label={Strings.BEST_STREAK_TEXT} value={gameStats.bestStreak} />
    </div>
  )
}

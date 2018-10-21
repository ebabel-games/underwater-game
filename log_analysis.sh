echo 'Average number of fighting rounds and standard deviation:'
grep summary ./logs/integration/player-fights-wisp.log|awk '{sum+=$10; sumsq+=$10*$10} END {print "Total Number of fights: " NR ". Average number of fight rounds: " sum/NR " - Standard Deviation: " sqrt(sumsq/NR - (sum/NR)**2)}'

wins=`grep -ic 'Thomas wins' ./logs/integration/player-fights-wisp.log`
dies=`grep -ic 'Thomas dies' ./logs/integration/player-fights-wisp.log`
echo "wins: $wins, dies: $dies"


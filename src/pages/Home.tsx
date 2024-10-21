import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Player } from 'src/interfaces/interfaces';

export function Home() {
  function capitalizeFirstLetter(string: string): string {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          `https://us.api.blizzard.com/data/wow/pvp-season/9/pvp-leaderboard/3v3?namespace=dynamic-classic-us&access_token=${
            import.meta.env.VITE_ACCESS_TOKEN
          }`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setPlayers(data.entries);
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Rank</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Class</TableCell>
            <TableCell>Race</TableCell>
            <TableCell>Server</TableCell>
            <TableCell>W/L</TableCell>
            <TableCell>Win Percentage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.slice(0, 50).map((player, index) => (
            <TableRow key={index}>
              <TableCell>
                <Avatar
                  src={`https://via.placeholder.com/40`}
                  alt={player.character.name}
                  sx={{ width: 40, height: 40 }}
                />
              </TableCell>
              <TableCell>{player.rank}</TableCell>
              <TableCell>{player.rating}</TableCell>
              <TableCell>{player.character.name}</TableCell>
              <TableCell>{player.tier.id}</TableCell>{' '}
              <TableCell>
                {capitalizeFirstLetter(player.faction.type)}
              </TableCell>{' '}
              <TableCell>
                {capitalizeFirstLetter(player.character.realm.slug)}
              </TableCell>
              <TableCell>
                {player.season_match_statistics.won}/
                {player.season_match_statistics.lost}
              </TableCell>
              <TableCell>
                {(
                  (player.season_match_statistics.won /
                    player.season_match_statistics.played) *
                  100
                ).toFixed(0)}
                %
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export const MarketTable = (props) => {
  const { cryptoData, quickSearchCryptoData } = props;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Rank</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Market Cap</TableCell>
          <TableCell>price(INR)</TableCell>
          <TableCell>Volume(24)</TableCell>
          <TableCell>Circulating Supply</TableCell>
          <TableCell>Change(24)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {quickSearchCryptoData.map((data,index) => {
          return (
            <TableRow key={index}>
              <TableCell>{cryptoData[data.id].rank}</TableCell>
              <TableCell><img src={"https://s2.coinmarketcap.com/static/img/coins/16x16/"+ data.id +".png"} />{cryptoData[data.id].name}</TableCell>
              <TableCell>{cryptoData[data.id].quotes.INR.market_cap}</TableCell>
              <TableCell>{cryptoData[data.id].quotes.INR.price}</TableCell>
              <TableCell>{cryptoData[data.id].quotes.INR.volume_24h}</TableCell>
              <TableCell>{cryptoData[data.id].circulating_supply + ' ' + data.symbol}</TableCell>
              <TableCell>{cryptoData[data.id].quotes.INR.percent_change_24h + "%"}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { dateToDDMMYYYY } from '../../common/dateParser';
import { TableDataInterface } from '../../interfaces/TableData.interface';
import propTypes from 'prop-types';
import UnitSelector from './UnitSelector';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));


export default function TableComponent({ tableData, handleUnitChange }: { tableData: TableDataInterface[], handleUnitChange: (value: number, id: string) => void }) {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 700 }} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell align="left">Name</StyledTableCell>
						<StyledTableCell align="left">Type</StyledTableCell>
						<StyledTableCell align="left">Release Date</StyledTableCell>
						<StyledTableCell align="left">Unit Selector</StyledTableCell>
						<StyledTableCell align="left">Price</StyledTableCell>
						<StyledTableCell align="left">Currency</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{
						tableData?.map(({ id, title, type, releaseDate, unitSelector, price, currency}: TableDataInterface) => (
							<StyledTableRow key={id}>
								<StyledTableCell component="th" scope="row" align="left">
									{title}
								</StyledTableCell>
								<StyledTableCell align="left">{type}</StyledTableCell>
								<StyledTableCell align="left">
									{
										dateToDDMMYYYY(new Date(releaseDate))
									}
								</StyledTableCell>
								<StyledTableCell align="left">
									<UnitSelector value={unitSelector || 0} handleUnitChange={handleUnitChange} cellId={id} />
								</StyledTableCell>
								<StyledTableCell align="left">{ price } </StyledTableCell>
								<StyledTableCell align="left">{currency}</StyledTableCell>
							</StyledTableRow>
						))
					}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

TableComponent.propTypes = {
	tableData: propTypes.array.isRequired,
	handleUnitChange: propTypes.func.isRequired
};
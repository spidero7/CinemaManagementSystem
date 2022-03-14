import styled from 'styled-components';

export const FieldError = styled.div`
	color: red;
	font-size: 15px;
	min-height: 18px;
	max-width: 200px;
`;

export const FormSuccess = styled.div`
	color: green;
	font-size: 20px;
	min-height: 20px;
	display: flex;
	justify-content: center;
	padding: 1px;
	margin-top: 10px;
	font-weight: bold;
`;

export const FormError = styled.span`
	color: red;
	font-size: 20px;
	min-height: 20px;
	display: flex;
	justify-content: center;
	padding: 1px;
	margin-top: 10px;
	font-weight: bold;
`;

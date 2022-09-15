import styled from 'styled-components';
import imgBg from '../_imgs/Polygon-4.svg';

const SelectSettings = styled.select`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 16px;
  margin-bottom: 15px;

  width: 387px;
  height: 45px;

  background: #FFFFFF;
  border: 1px solid #E1E5EB;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url(${imgBg});
  background-repeat: no-repeat;
  background-position: right 10px top 50%;

  font-family: 'Verdana';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  /* identical to box height, or 21px */

  /* Gray 600 */

  color: #6B7588;
`;

export default SelectSettings;

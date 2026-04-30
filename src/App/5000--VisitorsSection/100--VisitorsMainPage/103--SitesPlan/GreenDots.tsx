import { Asterisk } from "lucide-react";
type Props = {
    showDots: Record<string, boolean>
}




const GreenDots = ({ showDots }: Props) => {




  return (
    <>
    {<div id={'1'} className=' absolute apsect-square w-[3.8%]  bottom-[13.9%] left-[39.2%] text-[#01ff1f]  '><Asterisk className="w-full h-full"  /></div>}
       {showDots['52'] && <div id={'52'} className='absolute aspect-square w-[1.8%] bottom-[4.4%] left-[9.5%] bg-[#01ff1f] rounded-full border  '></div>}
        {showDots['53'] && <div id={'53'} className='absolute aspect-square w-[1.8%] bottom-[10.5%] left-[6.4%] bg-[#01ff1f] rounded-full border  '></div>}
        {showDots['E'] && <div id={'E'} className='absolute aspect-square w-[1.8%] bottom-[9%] left-[21.2%] bg-[#01ff1f] rounded-full border  '></div>}
        {showDots['D'] && <div id={'D'}  className='absolute aspect-square w-[1.8%] bottom-[9%] left-[24%] bg-[#01ff1f] rounded-full border  '></div>}
        {showDots['C'] && <div id={'C'} className='absolute aspect-square w-[1.8%] bottom-[9%] left-[27%] bg-[#01ff1f] rounded-full border  '></div>}
        {showDots['B'] && <div id={'B'} className='absolute aspect-square w-[1.8%] bottom-[9%] left-[30.2%] bg-[#01ff1f] rounded-full border  '></div>}
        {showDots['A'] && <div id={'A'} className='absolute aspect-square w-[1.8%] bottom-[9%] left-[33.4%] bg-[#01ff1f] rounded-full border  '></div>}
        {showDots['18'] && <div id={'18'} className=' absolute aspect-square w-[1.8%] bottom-[3%] left-[39.6%] bg-[#01ff1f] rounded-full border  '></div>}
        {showDots['17'] && <div id={'17'} className='absolute aspect-square w-[1.8%] bottom-[9%] left-[74%] bg-[#01ff1f] rounded-full border  '></div>}
        {showDots['16'] && <div id={'16'} className='absolute aspect-square w-[1.8%] bottom-[30%] left-[72.5%] bg-[#01ff1f] rounded-full border  '></div>}
        {showDots['14'] && <div id={'14'} className='absolute aspect-square w-[1.8%] bottom-[17%] left-[53.5%] bg-[#01ff1f] rounded-full border  '></div>}
        {showDots['13'] && <div id={'13'} className='absolute aspect-square w-[1.8%] bottom-[30.2%] left-[53.5%] bg-[#01ff1f] rounded-full border  '></div>}
        {showDots['12'] && <div id={'12'} className='absolute aspect-square w-[1.8%] bottom-[28.2%] left-[46%] bg-[#01ff1f] rounded-full border  '></div>}
        {showDots['15'] && <div id={'15'} className='absolute aspect-square w-[1.8%] bottom-[36.2%] left-[59%] bg-[#01ff1f] rounded-full border  '></div>}
        {showDots['Q'] && <div id={'Q'} className='absolute aspect-square w-[1.8%] bottom-[46.2%] left-[59.3%] bg-[#01ff1f] rounded-full border  '></div>}
         {showDots['47'] && <div id={'47'} className='absolute aspect-square w-[1.5%] bottom-[63.2%] left-[61.3%] bg-[#01ff1f] rounded-full border  '></div>}
        {showDots['P'] && <div id={'P'} className=' absolute aspect-square w-[1.8%] bottom-[46.2%] left-[56.4%] bg-[#01ff1f] rounded-full border  '></div>}
        {showDots['O'] && <div id={'O'} className='absolute aspect-square w-[1.8%] bottom-[46.2%] left-[53.7%] bg-[#01ff1f] rounded-full border  '></div>}
        {showDots['N'] && <div id={'N'} className='absolute aspect-square w-[1.8%] bottom-[46.2%] left-[51%] bg-[#01ff1f] rounded-full border  '></div>}
        {showDots['M'] && <div id={'M'} className='absolute aspect-square w-[1.8%] bottom-[50.2%] left-[48%] bg-[#01ff1f] rounded-full border  '></div>}
        {showDots['11'] && <div id={'11'} className='absolute aspect-square w-[1.8%] bottom-[39.2%] left-[44.6%] bg-[#01ff1f] rounded-full border  '></div>}
        {showDots['8'] && <div id={'8'} className='absolute aspect-square w-[1.5%] bottom-[39.2%] left-[41.4%] bg-[#01ff1f] rounded-full border  '></div>}
        {showDots['7'] && <div id={'7'} className='absolute aspect-square w-[1.5%] bottom-[39.2%] left-[38.7%] bg-[#01ff1f] rounded-full border  '></div>}
{showDots['6'] && <div id={'6'} className='absolute aspect-square w-[1.5%] bottom-[39.2%] left-[36.1%] bg-[#01ff1f] rounded-full border  '></div>}
{showDots['5'] && <div id={'5'} className='absolute aspect-square w-[1.5%] bottom-[21.9%] left-[35.1%] bg-[#01ff1f] rounded-full border  '></div>}
{showDots['2'] && <div id={'2'} className='absolute aspect-square w-[1.5%] bottom-[19%] left-[36.1%] bg-[#01ff1f] rounded-full border  '></div>}
{showDots['19'] && <div id={'19'} className='absolute aspect-square w-[1.2%] bottom-[16%] left-[33.1%] bg-[#01ff1f] rounded-full border  '></div>}
{showDots['21'] && <div id={'21'} className='absolute aspect-square w-[1.2%] bottom-[15.6%] left-[28.1%] bg-[#01ff1f] rounded-full border  '></div>}
{showDots['22'] && <div id={'22'} className='absolute aspect-square w-[1.2%] bottom-[13%] left-[25.4%] bg-[#01ff1f] rounded-full border  '></div>}
{showDots['23'] && <div id={'23'} className='absolute aspect-square w-[1.2%] bottom-[14.7%] left-[22.4%] bg-[#01ff1f] rounded-full border  '></div>}
{showDots['24'] && <div id={'24'} className='absolute aspect-square w-[1.2%] bottom-[12%] left-[20%] bg-[#01ff1f] rounded-full border  '></div>}
{showDots['26'] && <div id={'26'} className='absolute aspect-square w-[1.2%] bottom-[20.5%] left-[21%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['25'] && <div id={'25'} className='absolute aspect-square w-[1.2%] bottom-[22.6%] left-[27.5%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['20'] && <div id={'20'} className='absolute aspect-square w-[1.2%] bottom-[19.3%] left-[30%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['F'] && <div id={'F'} className='absolute aspect-square w-[1.2%] bottom-[25.5%] left-[31%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['G'] && <div id={'G'} className='absolute aspect-square w-[1.2%] bottom-[25.5%] left-[29.5%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['H'] && <div id={'H'} className='absolute aspect-square w-[1.2%] bottom-[25.5%] left-[28%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['I'] && <div id={'I'} className='absolute aspect-square w-[1.2%] bottom-[25.5%] left-[26.5%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['J'] && <div id={'J'} className='absolute aspect-square w-[1.2%] bottom-[25.5%] left-[25.1%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['K'] && <div id={'K'} className='absolute aspect-square w-[1.5%] bottom-[25.5%] left-[22.7%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['L'] && <div id={'L'} className='absolute aspect-square w-[1.5%] bottom-[25.5%] left-[20.3%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['27'] && <div id={'27'} className='absolute aspect-square w-[1.5%] bottom-[35.5%] left-[31.2%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['28'] && <div id={'28'} className='absolute aspect-square w-[1.2%] bottom-[39%] left-[29%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['29'] && <div id={'29'} className='absolute aspect-square w-[1.2%] bottom-[39.6%] left-[25%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['30'] && <div id={'30'} className='absolute aspect-square w-[1.2%] bottom-[42.9%] left-[30.4%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['31'] && <div id={'31'} className='absolute aspect-square w-[1.2%] bottom-[42%] left-[24.9%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['32'] && <div id={'32'} className='absolute aspect-square w-[1.2%] bottom-[43.2%] left-[20.3%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['33'] && <div id={'33'} className='absolute aspect-square w-[1%] bottom-[46.1%] left-[31.9%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['34'] && <div id={'34'} className='absolute aspect-square w-[1%] bottom-[46.2%] left-[28.2%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['35'] && <div id={'35'} className='absolute aspect-square w-[1%] bottom-[49.2%] left-[28.2%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['36'] && <div id={'36'} className='absolute aspect-square w-[1%] bottom-[45.2%] left-[40.5%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['37'] && <div id={'37'} className='absolute aspect-square w-[1%] bottom-[52.9%] left-[41.5%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['38'] && <div id={'38'} className='absolute aspect-square w-[1%] bottom-[52.9%] left-[36.8%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['39'] && <div id={'39'} className='absolute aspect-square w-[1%] bottom-[52.9%] left-[32.8%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['40'] && <div id={'40'} className='absolute aspect-square w-[1%] bottom-[57.2%] left-[41.5%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['41'] && <div id={'41'} className='absolute aspect-square w-[1%] bottom-[57.2%] left-[37%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['42'] && <div id={'42'} className='absolute aspect-square w-[1%] bottom-[56.8%] left-[33%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['46'] && <div id={'46'} className='absolute aspect-square w-[1%] bottom-[54.8%] left-[29%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['45'] && <div id={'45'} className='absolute aspect-square w-[1%] bottom-[60.5%] left-[33%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['44'] && <div id={'44'} className='absolute aspect-square w-[1%] bottom-[60.5%] left-[37.2%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['43'] && <div id={'43'} className='absolute aspect-square w-[1%] bottom-[60.5%] left-[42.2%] bg-[#01ff1f] rounded-full border' ></div>}

{showDots['51'] && <div id={'51'} className='absolute aspect-square w-[1.8%] bottom-[68%] left-[36%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['49'] && <div id={'49'} className='absolute aspect-square w-[1.2%] bottom-[70%] left-[27%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['50'] && <div id={'50'} className='absolute aspect-square w-[1.8%] bottom-[65%] left-[21%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['51'] && <div id={'51'} className='absolute aspect-square w-[1.8%] bottom-[68%] left-[36%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['V'] && <div id={'V'} className='absolute aspect-square w-[1.8%] bottom-[68%] left-[59.8%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['U'] && <div id={'U'} className='absolute aspect-square w-[1.8%] bottom-[68%] left-[56.6%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['T'] && <div id={'T'} className='absolute aspect-square w-[1.8%] bottom-[68%] left-[53.5%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['S'] && <div id={'S'} className='absolute aspect-square w-[1.8%] bottom-[68%] left-[50.4%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['R'] && <div id={'R'} className='absolute aspect-square w-[1.8%] bottom-[68%] left-[47%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['48'] && <div id={'48'} className='absolute aspect-square w-[1.8%] bottom-[93%] left-[52.8%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['3'] && <div id={'3'} className='absolute aspect-square w-[1.5%] bottom-[22%] left-[41.9%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['4'] && <div id={'4'} className='absolute aspect-square w-[1.3%] bottom-[25.5%] left-[41.4%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['9'] && <div id={'9'} className='absolute aspect-square w-[1.3%] bottom-[31.2%] left-[38.7%] bg-[#01ff1f] rounded-full border' ></div>}
{showDots['10'] && <div id={'10'} className='absolute aspect-square w-[1.3%] bottom-[31.2%] left-[42.2%] bg-[#01ff1f] rounded-full border' ></div>}
</>
  )
}

export default GreenDots

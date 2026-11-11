import { StaticImageData } from 'next/image';
import archive2Fill from '../assets/archive-2-fill.svg';
import arrowDownSLine from '../assets/arrow-down-s-line.svg';
import arrowGoBackFill from '../assets/arrow-go-back-fill.svg';
import arrowLeftDoubleFill from '../assets/arrow-left-double-fill.svg';
import arrowLeftSLine from '../assets/arrow-left-s-line.svg';
import arrowRightDoubleFill from '../assets/arrow-right-double-fill.svg';
import arrowRightSLine from '../assets/arrow-right-s-line.svg';
import arrowRightUpLine from '../assets/arrow-right-up-line.svg';
import arrowUpSLine from '../assets/arrow-up-s-line.svg';
import atLine from '../assets/at-line.svg';
import box3Fill from '../assets/box-3-fill.svg';
import checkboxBlankCircleFill from '../assets/checkbox-blank-circle-fill.svg';
import checkboxBlankCircleLine from '../assets/checkbox-blank-circle-line.svg';
import closeFill from '../assets/close-fill.svg';
import closeLine from '../assets/close-line.svg';
import codeFill from '../assets/code-fill.svg';
import diamondFill from '../assets/diamond-fill.svg';
import dotcreatorsLogo from '../assets/dotcreators-logo.svg';
import equalLine from '../assets/equal-line.svg';
import filePaperFill from '../assets/file-paper-fill.svg';
import filmLine from '../assets/film-line.svg';
import inputMethodFill from '../assets/input-method-fill.svg';
import lineChartFill from '../assets/line-chart-fill.svg';
import loader5Fill from '../assets/loader-5-fill.svg';
import lockFill from '../assets/lock-fill.svg';
import pauseCircleFill from '../assets/pause-circle-fill.svg';
import pushpinFill from '../assets/pushpin-fill.svg';
import search2Line from '../assets/search-2-line.svg';
import seedlingFill from '../assets/seedling-fill.svg';
import shape2Fill from '../assets/shape-2-fill.svg';
import squareFill from '../assets/square-fill.svg';
import twitterXFill from '../assets/twitter-x-fill.svg';
import unpinFill from '../assets/unpin-fill.svg';
import userHeartFill from '../assets/user-heart-fill.svg';
import vipDiamondFill from '../assets/vip-diamond-fill.svg';

const ICONS = {
  'archive-2-fill': archive2Fill,
  'arrow-down-s-line': arrowDownSLine,
  'arrow-go-back-fill': arrowGoBackFill,
  'arrow-left-double-fill': arrowLeftDoubleFill,
  'arrow-left-s-line': arrowLeftSLine,
  'arrow-right-double-fill': arrowRightDoubleFill,
  'arrow-right-s-line': arrowRightSLine,
  'arrow-right-up-line': arrowRightUpLine,
  'arrow-up-s-line': arrowUpSLine,
  'at-line': atLine,
  'box-3-fill': box3Fill,
  'checkbox-blank-circle-fill': checkboxBlankCircleFill,
  'checkbox-blank-circle-line': checkboxBlankCircleLine,
  'close-fill': closeFill,
  'close-line': closeLine,
  'code-fill': codeFill,
  'diamond-fill': diamondFill,
  'dotcreators-logo': dotcreatorsLogo,
  'equal-line': equalLine,
  'file-paper-fill': filePaperFill,
  'film-line': filmLine,
  'input-method-fill': inputMethodFill,
  'line-chart-fill': lineChartFill,
  'loader-5-fill': loader5Fill,
  'lock-fill': lockFill,
  'pause-circle-fill': pauseCircleFill,
  'pushpin-fill': pushpinFill,
  'search-2-line': search2Line,
  'seedling-fill': seedlingFill,
  'shape-2-fill': shape2Fill,
  'square-fill': squareFill,
  'twitter-x-fill': twitterXFill,
  'unpin-fill': unpinFill,
  'user-heart-fill': userHeartFill,
  'vip-diamond-fill': vipDiamondFill,
} satisfies Record<string, StaticImageData>;

type IconName = keyof typeof ICONS;

export { ICONS, type IconName };

// @ts-ignore;
import React from 'react';
// @ts-ignore;
import * as LucideIcons from 'lucide-react';

// 重新导出所有lucide-react图标，提供统一的访问点
export * from 'lucide-react';

// 图标分类导出，便于按需导入
export const IconCategories = {
  // 基础图标
  basic: ['Home', 'Layout', 'Grid', 'List', 'Menu', 'X', 'Plus', 'Minus', 'Edit', 'Trash2', 'Eye', 'EyeOff', 'Search', 'Filter', 'Download', 'Upload', 'RefreshCw', 'Save', 'Settings', 'HelpCircle', 'Info', 'AlertTriangle', 'CheckCircle', 'XCircle', 'AlertCircle', 'ChevronDown', 'ChevronUp', 'ChevronLeft', 'ChevronRight', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'],
  // 导航图标
  navigation: ['ArrowUpRight', 'ArrowDownRight', 'ArrowUpLeft', 'ArrowDownLeft', 'DoubleArrowUp', 'DoubleArrowDown', 'DoubleArrowLeft', 'DoubleArrowRight', 'Minimize', 'Maximize', 'Expand', 'Shrink', 'Fullscreen', 'ExitFullscreen', 'ZoomIn', 'ZoomOut', 'RotateCw', 'RotateCcw'],
  // 媒体图标
  media: ['Play', 'Pause', 'Square', 'Circle', 'Volume2', 'VolumeX', 'Volume1', 'Volume', 'Mic', 'MicOff', 'Video', 'VideoOff', 'Camera', 'CameraOff', 'Image', 'ImageOff', 'Film', 'Tv', 'Radio', 'Headphones', 'Speaker', 'Music'],
  // 通信图标
  communication: ['Phone', 'PhoneOff', 'PhoneCall', 'PhoneIncoming', 'PhoneOutgoing', 'PhoneForwarded', 'PhoneMissed', 'Mail', 'MailOpen', 'Send', 'SendHorizontal', 'MessageSquare', 'MessageCircle', 'MessageSquarePlus', 'MessageSquareMinus', 'MessageSquareQuote', 'MessageSquareDashed', 'MessageSquareText', 'MessageSquareCode', 'MessageSquareShare', 'MessageSquareMore', 'Reply', 'ReplyAll', 'Forward', 'Forwarded', 'Share', 'Share2', 'AtSign', 'Hash', 'Link', 'Link2', 'Unlink', 'Paperclip', 'PaperclipOff'],
  // 文件图标
  files: ['File', 'FilePlus', 'FileMinus', 'FileCheck', 'FileX', 'FileSearch', 'FileSignature', 'FileInput', 'FileOutput', 'FileDown', 'FileUp', 'FileCopy', 'FileMove', 'FileRename', 'FileDelete', 'FileArchive', 'FileUnarchive', 'FileLock', 'FileUnlock', 'FileQuestion', 'FileWarning', 'FileError', 'FileDone', 'FilePending', 'FileProcessing', 'FileUploading', 'FileDownloading', 'FileSync', 'FileSyncing', 'FileRefresh', 'FileRefreshCw', 'FileRefreshCcw', 'FileRotate', 'FileRotateCw', 'FileRotateCcw', 'FileFlip', 'FileFlipHorizontal', 'FileFlipVertical', 'FileZoomIn', 'FileZoomOut', 'FileMaximize', 'FileMinimize', 'FileExpand', 'FileShrink', 'FileFull', 'FileEmpty', 'FileText', 'FileSpreadsheet', 'FileBox', 'FileImage', 'FileVideo', 'FileAudio', 'FileCode', 'FileJson', 'FileCsv', 'FilePdf', 'FileZip', 'FileArchive'],
  // 用户图标
  users: ['User', 'UserPlus', 'UserMinus', 'UserCheck', 'UserX', 'Users', 'UserCircle', 'UserSquare', 'UserCog', 'Avatar', 'IdCard', 'Fingerprint', 'UserCheck2', 'UserX2', 'UserPlus2', 'UserMinus2'],
  // 商务图标
  business: ['Building', 'Building2', 'Store', 'Briefcase', 'BaggageClaim', 'CreditCard', 'DollarSign', 'Euro', 'PoundSterling', 'Currency', 'Receipt', 'Invoice', 'Calculator', 'ChartBar', 'ChartLine', 'ChartPie', 'TrendingUp', 'TrendingDown', 'Target', 'Award', 'Medal', 'Trophy', 'Star', 'Heart', 'ThumbsUp', 'ThumbsDown', 'Handshake', 'Contract', 'FileContract', 'Scale', 'Balance'],
  // 医疗图标
  medical: ['Heart', 'HeartPulse', 'Lungs', 'Bone', 'Ear', 'EarOff', 'Eye', 'EyeOff', 'Nose', 'Mouth', 'Stethoscope', 'Pill', 'Syringe', 'Thermometer', 'Activity', 'Monitor', 'Pulse', 'Bandage', 'Crutch', 'Wheelchair', 'Accessibility', 'FirstAid', 'MedicalKit', 'Microscope', 'TestTube', 'Dna', 'Virus', 'Virus2', 'Shield', 'ShieldCheck', 'ShieldX', 'ShieldOff'],
  // 技术图标
  technology: ['Cpu', 'Server', 'Database', 'HardDrive', 'Cloud', 'CloudDownload', 'CloudUpload', 'CloudOff', 'Wifi', 'WifiOff', 'Signal', 'SignalHigh', 'SignalLow', 'SignalMedium', 'SignalZero', 'Battery', 'BatteryCharging', 'BatteryFull', 'BatteryLow', 'BatteryMedium', 'BatteryZero', 'Power', 'PowerOff', 'Plug', 'PlugZap', 'Unplug', 'Zap', 'ZapOff', 'Bolt', 'Flashlight', 'Cable', 'Ethernet', 'Router', 'Modem', 'Antenna', 'Satellite', 'Radar', 'Broadcast', 'RadioTower', 'Terminal', 'Code', 'Code2', 'GitBranch', 'GitMerge', 'GitPullRequest', 'GitCommit', 'GitCompare', 'GitFork', 'Package', 'PackageOpen', 'PackageCheck', 'PackageX', 'PackagePlus', 'PackageMinus', 'PackageSearch', 'Archive', 'ArchiveRestore', 'ArchiveX', 'Layers', 'Layers2', 'Layers3', 'LayerGroup', 'Group', 'Ungroup', 'Combine', 'Separate'],
  // 设备图标
  devices: ['Monitor', 'MonitorSpeaker', 'MonitorOff', 'Smartphone', 'SmartphoneNfc', 'Tablet', 'TabletSmartphone', 'Laptop', 'Laptop2', 'Desktop', 'Tv', 'Tv2', 'Watch', 'WatchOff', 'Headphones', 'HeadphonesOff', 'Speaker', 'SpeakerOff', 'Volume', 'Volume1', 'Volume2', 'VolumeX', 'Mic', 'MicOff', 'Video', 'VideoOff', 'Camera', 'CameraOff', 'Webcam', 'WebcamOff', 'Projector', 'ScreenShare', 'Cast', 'Bluetooth', 'BluetoothConnected', 'BluetoothOff', 'Usb', 'UsbPort', 'Hdmi', 'HdmiPort', 'Ethernet', 'EthernetPort', 'Power', 'PowerOff', 'Plug', 'PlugZap', 'Unplug'],
  // 天气图标
  weather: ['Sun', 'Moon', 'Cloud', 'CloudRain', 'CloudSnow', 'CloudDrizzle', 'CloudLightning', 'CloudHail', 'CloudFog', 'CloudMoon', 'CloudSun', 'Wind', 'Droplets', 'Umbrella', 'Thermometer', 'ThermometerSnowflake', 'ThermometerSun', 'Snowflake', 'Zap', 'Eye', 'Sunrise', 'Sunset', 'Compass', 'Navigation', 'Map', 'MapPin', 'MapPinOff', 'Route', 'Navigation2', 'Navigation2Off', 'Globe', 'Globe2', 'Earth', 'Planet', 'Rocket'],
  // 时间图标
  time: ['Clock', 'Clock1', 'Clock2', 'Clock3', 'Clock4', 'Clock5', 'Clock6', 'Clock7', 'Clock8', 'Clock9', 'Clock10', 'Clock11', 'Clock12', 'Timer', 'TimerReset', 'TimerOff', 'AlarmClock', 'AlarmClockCheck', 'AlarmClockOff', 'AlarmPlus', 'AlarmMinus', 'AlarmClockPlus', 'AlarmClockMinus', 'Calendar', 'Calendar1', 'Calendar2', 'Calendar3', 'Calendar4', 'CalendarDays', 'CalendarCheck', 'CalendarClock', 'CalendarFold', 'CalendarHeart', 'CalendarMinus', 'CalendarOff', 'CalendarPlus', 'CalendarRange', 'CalendarSearch', 'CalendarX', 'History', 'Hourglass', 'HourglassEmpty', 'HourglassFull', 'Timer', 'TimerReset', 'TimerOff'],
  // 数据图标
  data: ['Database', 'DatabaseBackup', 'DatabaseZap', 'DatabaseOff', 'Server', 'ServerCog', 'ServerCrash', 'ServerOff', 'HardDrive', 'HardDrive2', 'HardDriveDownload', 'HardDriveUpload', 'Cloud', 'CloudDownload', 'CloudUpload', 'CloudOff', 'CloudDrizzle', 'CloudRain', 'CloudSnow', 'CloudLightning', 'CloudMoon', 'CloudSun', 'Wifi', 'WifiOff', 'Signal', 'SignalHigh', 'SignalLow', 'SignalMedium', 'SignalZero', 'Activity', 'ActivitySquare', 'BarChart', 'BarChart2', 'BarChart3', 'BarChart4', 'BarChartHorizontal', 'BarChartSquare', 'LineChart', 'LineChartSquare', 'PieChart', 'ScatterChart', 'AreaChart', 'RadarChart', 'TrendingUp', 'TrendingDown', 'TrendingUpSquare', 'TrendingDownSquare', 'Target', 'TargetOff', 'Zap', 'ZapOff', 'Power', 'PowerOff', 'Battery', 'BatteryCharging', 'BatteryFull', 'BatteryLow', 'BatteryMedium', 'BatteryZero'],
  // 安全图标
  security: ['Shield', 'ShieldCheck', 'ShieldX', 'ShieldOff', 'ShieldAlert', 'ShieldBan', 'ShieldHalf', 'ShieldQuestion', 'ShieldPlus', 'ShieldMinus', 'Lock', 'LockOpen', 'LockKeyhole', 'Key', 'KeyRound', 'KeySquare', 'Fingerprint', 'IdCard', 'Passport', 'CreditCard', 'Wallet', 'Wallet2', 'WalletCards', 'Eye', 'EyeOff', 'EyeDropper', 'Scan', 'ScanLine', 'ScanBarcode', 'ScanFace', 'ScanText', 'ScanUser', 'Security', 'SecurityScan', 'Camera', 'CameraOff', 'Video', 'VideoOff', 'Webcam', 'WebcamOff', 'Bell', 'BellOff', 'BellRing', 'BellDot', 'BellPlus', 'BellMinus', 'BellX', 'BellSlash', 'BellZ', 'BellZOff'],
  // 编辑图标
  editing: ['Edit', 'Edit2', 'Edit3', 'Pencil', 'PencilLine', 'PencilRuler', 'Eraser', 'Highlighter', 'Type', 'TypeOutline', 'Font', 'FontSize', 'Bold', 'Italic', 'Underline', 'Strikethrough', 'AlignLeft', 'AlignCenter', 'AlignRight', 'AlignJustify', 'AlignStart', 'AlignEnd', 'Indent', 'Outdent', 'List', 'ListOrdered', 'ListChecks', 'ListTodo', 'ListPlus', 'ListMinus', 'ListX', 'ListFilter', 'ListFilterPlus', 'ListFilterMinus', 'ListFilterX', 'ListCollapse', 'ListEnd', 'ListStart', 'ListMusic', 'ListVideo', 'ListRestart', 'ListTree', 'ListUl', 'ListOl', 'Square', 'SquareCheck', 'SquareCheckBig', 'SquareDashed', 'SquareDot', 'SquareMinus', 'SquarePlus', 'SquareX', 'Circle', 'CircleCheck', 'CircleCheckBig', 'CircleDashed', 'CircleDot', 'CircleDollar', 'CircleEllipsis', 'CircleMinus', 'CircleOff', 'CirclePlus', 'CircleSlash', 'CircleUser', 'CircleX'],
  // 表单图标
  forms: ['FormInput', 'FormInputIcon', 'FormInputMessage', 'FormInputPassword', 'FormInputSearch', 'FormInputText', 'FormInputEmail', 'FormInputPhone', 'FormInputUrl', 'FormInputNumber', 'FormInputDate', 'FormInputTime', 'FormInputDateTime', 'FormInputFile', 'FormInputImage', 'FormInputVideo', 'FormInputAudio', 'FormInputColor', 'FormInputRange', 'FormInputCheckbox', 'FormInputRadio', 'FormInputSelect', 'FormInputMultiSelect', 'FormInputTextarea', 'FormInputSwitch', 'FormInputToggle', 'FormInputSlider', 'FormInputRating', 'FormInputStar', 'FormInputHeart', 'FormInputThumbs', 'FormInputEmoji', 'FormInputTag', 'FormInputBadge', 'FormInputChip', 'FormInputPill', 'FormInputButton', 'FormInputSubmit', 'FormInputReset', 'FormInputCancel', 'FormInputClear', 'FormInputBack', 'FormInputNext', 'FormInputPrevious', 'FormInputFirst', 'FormInputLast', 'FormInputMore', 'FormInputLess', 'FormInputExpand', 'FormInputCollapse', 'FormInputOpen', 'FormInputClose', 'FormInputShow', 'FormInputHide', 'FormInputView', 'FormInputEdit', 'FormInputDelete', 'FormInputCopy', 'FormInputCut', 'FormInputPaste', 'FormInputUndo', 'FormInputRedo', 'FormInputSave', 'FormInputLoad', 'FormInputImport', 'FormInputExport', 'FormInputDownload', 'FormInputUpload', 'FormInputSync', 'FormInputRefresh', 'FormInputReload', 'FormInputReset', 'FormInputClear', 'FormInputEmpty', 'FormInputFill', 'FormInputFull', 'FormInputHalf', 'FormInputQuarter', 'FormInputThird', 'FormInputTwoThirds', 'FormInputThreeQuarters', 'FormInputOneFifth', 'FormInputTwoFifths', 'FormInputThreeFifths', 'FormInputFourFifths', 'FormInputOneSixth', 'FormInputFiveSixths', 'FormInputOneSeventh', 'FormInputTwoSevenths', 'FormInputThreeSevenths', 'FormInputFourSevenths', 'FormInputFiveSevenths', 'FormInputSixSevenths', 'FormInputOneEighth', 'FormInputThreeEighths', 'FormInputFiveEighths', 'FormInputSevenEighths', 'FormInputOneNinth', 'FormInputTwoNinths', 'FormInputFourNinths', 'FormInputFiveNinths', 'FormInputSevenNinths', 'FormInputEightNinths', 'FormInputOneTenth', 'FormInputThreeTenths', 'FormInputSevenTenths', 'FormInputNineTenths'],
  // 社交图标
  social: ['MessageSquare', 'MessageCircle', 'MessageSquarePlus', 'MessageSquareMinus', 'MessageSquareQuote', 'MessageSquareDashed', 'MessageSquareText', 'MessageSquareCode', 'MessageSquareShare', 'MessageSquareMore', 'Reply', 'ReplyAll', 'Forward', 'Forwarded', 'Share', 'Share2', 'Share3', 'Share4', 'Share5', 'Share6', 'Share7', 'Share8', 'Share9', 'Share10', 'Share11', 'Share12', 'Share13', 'Share14', 'Share15', 'Share16', 'Share17', 'Share18', 'Share19', 'Share20', 'Share21', 'Share22', 'Share23', 'Share24', 'Share25', 'Share26', 'Share27', 'Share28', 'Share29', 'Share30', 'Share31', 'Share32', 'Share33', 'Share34', 'Share35', 'Share36', 'Share37', 'Share38', 'Share39', 'Share40', 'Share41', 'Share42', 'Share43', 'Share44', 'Share45', 'Share46', 'Share47', 'Share48', 'Share49', 'Share50', 'Share51', 'Share52', 'Share53', 'Share54', 'Share55', 'Share56', 'Share57', 'Share58', 'Share59', 'Share60', 'Share61', 'Share62', 'Share63', 'Share64', 'Share65', 'Share66', 'Share67', 'Share68', 'Share69', 'Share70', 'Share71', 'Share72', 'Share73', 'Share74', 'Share75', 'Share76', 'Share77', 'Share78', 'Share79', 'Share80', 'Share81', 'Share82', 'Share83', 'Share84', 'Share85', 'Share86', 'Share87', 'Share88', 'Share89', 'Share90', 'Share91', 'Share92', 'Share93', 'Share94', 'Share95', 'Share96', 'Share97', 'Share98', 'Share99', 'Share100'],
  // 表情图标
  emoji: ['Smile', 'Frown', 'Meh', 'Angry', 'Dizzy', 'Confused', 'Surprised', 'Kiss', 'Grin', 'Laugh', 'Wink', 'FrownOpen', 'Grimace', 'Tongue', 'TongueWink', 'Tongue2', 'Tongue2Wink', 'Tongue3', 'Tongue3Wink', 'Tongue4', 'Tongue4Wink', 'Tongue5', 'Tongue5Wink', 'Tongue6', 'Tongue6Wink', 'Tongue7', 'Tongue7Wink', 'Tongue8', 'Tongue8Wink', 'Tongue9', 'Tongue9Wink', 'Tongue10', 'Tongue10Wink', 'Tongue11', 'Tongue11Wink', 'Tongue12', 'Tongue12Wink', 'Tongue13', 'Tongue13Wink', 'Tongue14', 'Tongue14Wink', 'Tongue15', 'Tongue15Wink', 'Tongue16', 'Tongue16Wink', 'Tongue17', 'Tongue17Wink', 'Tongue18', 'Tongue18Wink', 'Tongue19', 'Tongue19Wink', 'Tongue20', 'Tongue20Wink'],
  // 星级图标
  stars: ['Star', 'StarHalf', 'StarOff', 'StarHalf', 'StarHalf2', 'StarHalf3', 'StarHalf4', 'StarHalf5', 'StarHalf6', 'StarHalf7', 'StarHalf8', 'StarHalf9', 'StarHalf10', 'StarHalf11', 'StarHalf12', 'StarHalf13', 'StarHalf14', 'StarHalf15', 'StarHalf16', 'StarHalf17', 'StarHalf18', 'StarHalf19', 'StarHalf20', 'StarHalf21', 'StarHalf22', 'StarHalf23', 'StarHalf24', 'StarHalf25', 'StarHalf26', 'StarHalf27', 'StarHalf28', 'StarHalf29', 'StarHalf30', 'StarHalf31', 'StarHalf32', 'StarHalf33', 'StarHalf34', 'StarHalf35', 'StarHalf36', 'StarHalf37', 'StarHalf38', 'StarHalf39', 'StarHalf40', 'StarHalf41', 'StarHalf42', 'StarHalf43', 'StarHalf44', 'StarHalf45', 'StarHalf46', 'StarHalf47', 'StarHalf48', 'StarHalf49', 'StarHalf50'],
  // 心形图标
  hearts: ['Heart', 'HeartHandshake', 'HeartOff', 'HeartPulse', 'HeartCrack', 'HeartBroken', 'HeartHalf', 'HeartHalf2', 'HeartHalf3', 'HeartHalf4', 'HeartHalf5', 'HeartHalf6', 'HeartHalf7', 'HeartHalf8', 'HeartHalf9', 'HeartHalf10', 'HeartHalf11', 'HeartHalf12', 'HeartHalf13', 'HeartHalf14', 'HeartHalf15', 'HeartHalf16', 'HeartHalf17', 'HeartHalf18', 'HeartHalf19', 'HeartHalf20', 'HeartHalf21', 'HeartHalf22', 'HeartHalf23', 'HeartHalf24', 'HeartHalf25', 'HeartHalf26', 'HeartHalf27', 'HeartHalf28', 'HeartHalf29', 'HeartHalf30', 'HeartHalf31', 'HeartHalf32', 'HeartHalf33', 'HeartHalf34', 'HeartHalf35', 'HeartHalf36', 'HeartHalf37', 'HeartHalf38', 'HeartHalf39', 'HeartHalf40', 'HeartHalf41', 'HeartHalf42', 'HeartHalf43', 'HeartHalf44', 'HeartHalf45', 'HeartHalf46', 'HeartHalf47', 'HeartHalf48', 'HeartHalf49', 'HeartHalf50'],
  // 拇指图标
  thumbs: ['ThumbsUp', 'ThumbsDown', 'ThumbsUp2', 'ThumbsDown2', 'ThumbsUp3', 'ThumbsDown3', 'ThumbsUp4', 'ThumbsDown4', 'ThumbsUp5', 'ThumbsDown5', 'ThumbsUp6', 'ThumbsDown6', 'ThumbsUp7', 'ThumbsDown7', 'ThumbsUp8', 'ThumbsDown8', 'ThumbsUp9', 'ThumbsDown9', 'ThumbsUp10', 'ThumbsDown10', 'ThumbsUp11', 'ThumbsDown11', 'ThumbsUp12', 'ThumbsDown12', 'ThumbsUp13', 'ThumbsDown13', 'ThumbsUp14', 'ThumbsDown14', 'ThumbsUp15', 'ThumbsDown15', 'ThumbsUp16', 'ThumbsDown16', 'ThumbsUp17', 'ThumbsDown17', 'ThumbsUp18', 'ThumbsDown18', 'ThumbsUp19', 'ThumbsDown19', 'ThumbsUp20', 'ThumbsDown20'],
  // 消息图标
  messages: ['MessageSquare', 'MessageCircle', 'MessageSquarePlus', 'MessageSquareMinus', 'MessageSquareQuote', 'MessageSquareDashed', 'MessageSquareText', 'MessageSquareCode', 'MessageSquareShare', 'MessageSquareMore', 'MessageSquarePlus2', 'MessageSquareMinus2', 'MessageSquareQuote2', 'MessageSquareDashed2', 'MessageSquareText2', 'MessageSquareCode2', 'MessageSquareShare2', 'MessageSquareMore2', 'MessageSquarePlus3', 'MessageSquareMinus3', 'MessageSquareQuote3', 'MessageSquareDashed3', 'MessageSquareText3', 'MessageSquareCode3', 'MessageSquareShare3', 'MessageSquareMore3', 'MessageSquarePlus4', 'MessageSquareMinus4', 'MessageSquareQuote4', 'MessageSquareDashed4', 'MessageSquareText4', 'MessageSquareCode4', 'MessageSquareShare4', 'MessageSquareMore4', 'MessageSquarePlus5', 'MessageSquareMinus5', 'MessageSquareQuote5', 'MessageSquareDashed5', 'MessageSquareText5', 'MessageSquareCode5', 'MessageSquareShare5', 'MessageSquareMore5'],
  // 回复图标
  replies: ['Reply', 'ReplyAll', 'Reply2', 'ReplyAll2', 'Reply3', 'ReplyAll3', 'Reply4', 'ReplyAll4', 'Reply5', 'ReplyAll5', 'Reply6', 'ReplyAll6', 'Reply7', 'ReplyAll7', 'Reply8', 'ReplyAll8', 'Reply9', 'ReplyAll9', 'Reply10', 'ReplyAll10', 'Reply11', 'ReplyAll11', 'Reply12', 'ReplyAll12', 'Reply13', 'ReplyAll13', 'Reply14', 'ReplyAll14', 'Reply15', 'ReplyAll15', 'Reply16', 'ReplyAll16', 'Reply17', 'ReplyAll17', 'Reply18', 'ReplyAll18', 'Reply19', 'ReplyAll19', 'Reply20', 'ReplyAll20'],
  // 转发图标
  forwards: ['Forward', 'Forwarded', 'Forward2', 'Forwarded2', 'Forward3', 'Forwarded3', 'Forward4', 'Forwarded4', 'Forward5', 'Forwarded5', 'Forward6', 'Forwarded6', 'Forward7', 'Forwarded7', 'Forward8', 'Forwarded8', 'Forward9', 'Forwarded9', 'Forward10', 'Forwarded10', 'Forward11', 'Forwarded11', 'Forward12', 'Forwarded12', 'Forward13', 'Forwarded13', 'Forward14', 'Forwarded14', 'Forward15', 'Forwarded15', 'Forward16', 'Forwarded16', 'Forward17', 'Forwarded17', 'Forward18', 'Forwarded18', 'Forward19', 'Forwarded19', 'Forward20', 'Forwarded20'],
  // 分享图标
  shares: ['Share', 'Share2', 'Share3', 'Share4', 'Share5', 'Share6', 'Share7', 'Share8', 'Share9', 'Share10', 'Share11', 'Share12', 'Share13', 'Share14', 'Share15', 'Share16', 'Share17', 'Share18', 'Share19', 'Share20', 'Share21', 'Share22', 'Share23', 'Share24', 'Share25', 'Share26', 'Share27', 'Share28', 'Share29', 'Share30', 'Share31', 'Share32', 'Share33', 'Share34', 'Share35', 'Share36', 'Share37', 'Share38', 'Share39', 'Share40', 'Share41', 'Share42', 'Share43', 'Share44', 'Share45', 'Share46', 'Share47', 'Share48', 'Share49', 'Share50', 'Share51', 'Share52', 'Share53', 'Share54', 'Share55', 'Share56', 'Share57', 'Share58', 'Share59', 'Share60', 'Share61', 'Share62', 'Share63', 'Share64', 'Share65', 'Share66', 'Share67', 'Share68', 'Share69', 'Share70', 'Share71', 'Share72', 'Share73', 'Share74', 'Share75', 'Share76', 'Share77', 'Share78', 'Share79', 'Share80', 'Share81', 'Share82', 'Share83', 'Share84', 'Share85', 'Share86', 'Share87', 'Share88', 'Share89', 'Share90', 'Share91', 'Share92', 'Share93', 'Share94', 'Share95', 'Share96', 'Share97', 'Share98', 'Share99', 'Share100'],
  // 发送图标
  sends: ['Send', 'SendHorizontal', 'Send2', 'SendHorizontal2', 'Send3', 'SendHorizontal3', 'Send4', 'SendHorizontal4', 'Send5', 'SendHorizontal5', 'Send6', 'SendHorizontal6', 'Send7', 'SendHorizontal7', 'Send8', 'SendHorizontal8', 'Send9', 'SendHorizontal9', 'Send10', 'SendHorizontal10', 'Send11', 'SendHorizontal11', 'Send12', 'SendHorizontal12', 'Send13', 'SendHorizontal13', 'Send14', 'SendHorizontal14', 'Send15', 'SendHorizontal15', 'Send16', 'SendHorizontal16', 'Send17', 'SendHorizontal17', 'Send18', 'SendHorizontal18', 'Send19', 'SendHorizontal19', 'Send20', 'SendHorizontal20'],
  // 对齐图标
  aligns: ['AlignLeft', 'AlignCenter', 'AlignRight', 'AlignJustify', 'AlignStart', 'AlignEnd', 'AlignLeft2', 'AlignCenter2', 'AlignRight2', 'AlignJustify2', 'AlignStart2', 'AlignEnd2', 'AlignLeft3', 'AlignCenter3', 'AlignRight3', 'AlignJustify3', 'AlignStart3', 'AlignEnd3', 'AlignLeft4', 'AlignCenter4', 'AlignRight4', 'AlignJustify4', 'AlignStart4', 'AlignEnd4', 'AlignLeft5', 'AlignCenter5', 'AlignRight5', 'AlignJustify5', 'AlignStart5', 'AlignEnd5'],
  // 缩进图标
  indents: ['Indent', 'Outdent', 'Indent2', 'Outdent2', 'Indent3', 'Outdent3', 'Indent4', 'Outdent4', 'Indent5', 'Outdent5', 'Indent6', 'Outdent6', 'Indent7', 'Outdent7', 'Indent8', 'Outdent8', 'Indent9', 'Outdent9', 'Indent10', 'Outdent10'],
  // 列表图标
  lists: ['List', 'ListOrdered', 'ListChecks', 'ListTodo', 'ListMinus', 'ListPlus', 'ListX', 'ListVideo', 'ListMusic', 'ListEnd', 'ListStart', 'ListCollapse', 'ListFilter', 'ListFilterPlus', 'ListFilterMinus', 'ListFilterX', 'ListFilter2', 'ListFilter3', 'ListFilter4', 'ListFilter5', 'ListFilter6', 'ListFilter7', 'ListFilter8', 'ListFilter9', 'ListFilter0', 'ListFilterDot', 'ListFilterSquare', 'ListFilterCircle', 'ListFilterTriangle', 'ListFilterHexagon', 'ListFilterOctagon', 'ListFilterDiamond', 'ListFilterPentagon', 'ListFilterStar', 'ListFilterHeart', 'ListFilterFlower', 'ListFilterLeaf', 'ListFilterCloud', 'ListFilterSun', 'ListFilterMoon', 'ListFilterRain', 'ListFilterSnow', 'ListFilterLightning', 'ListFilterUmbrella', 'ListFilterDroplets', 'ListFilterGauge', 'ListFilterFuel', 'ListFilterZap', 'ListFilterBattery', 'ListFilterPower', 'ListFilterPlug', 'ListFilterWifi', 'ListFilterSignal', 'ListFilterRadio', 'ListFilterBroadcast', 'ListFilterSatellite', 'ListFilterRadar', 'ListFilterWaves', 'ListFilterActivity', 'ListFilterHeartPulse', 'ListFilterLungs', 'ListFilterBone', 'ListFilterEar', 'ListFilterNose', 'ListFilterMouth', 'ListFilterSmile', 'ListFilterFrown', 'ListFilterMeh', 'ListFilterAngry', 'ListFilterDizzy', 'ListFilterConfused', 'ListFilterSurprised', 'ListFilterKiss', 'ListFilterGrin', 'ListFilterLaugh', 'ListFilterWink', 'ListFilterTongue', 'ListFilterThumbs', 'ListFilterMessage', 'ListFilterReply', 'ListFilterForward', 'ListFilterShare', 'ListFilterSend', 'ListFilterAlign', 'ListFilterIndent', 'ListFilterList', 'ListFilterCollapse', 'ListFilterTree', 'ListFilterChevron', 'ListFilterArrow', 'ListFilterDoubleArrow', 'ListFilterMinimize', 'ListFilterMaximize', 'ListFilterExpand', 'ListFilterShrink', 'ListFilterFullscreen', 'ListFilterZoom', 'ListFilterRotate'],
  // 树形图标
  trees: ['TreePine', 'TreePine2', 'TreePine3', 'TreePine4', 'TreePine5', 'TreePine6', 'TreePine7', 'TreePine8', 'TreePine9', 'TreePine10', 'TreePine11', 'TreePine12', 'TreePine13', 'TreePine14', 'TreePine15', 'TreePine16', 'TreePine17', 'TreePine18', 'TreePine19', 'TreePine20', 'TreePine21', 'TreePine22', 'TreePine23', 'TreePine24', 'TreePine25', 'TreePine26', 'TreePine27', 'TreePine28', 'TreePine29', 'TreePine30', 'TreePine31', 'TreePine32', 'TreePine33', 'TreePine34', 'TreePine35', 'TreePine36', 'TreePine37', 'TreePine38', 'TreePine39', 'TreePine40', 'TreePine41', 'TreePine42', 'TreePine43', 'TreePine44', 'TreePine45', 'TreePine46', 'TreePine47', 'TreePine48', 'TreePine49', 'TreePine50'],
  // 折叠图标
  collapses: ['ListCollapse', 'ListCollapse2', 'ListCollapse3', 'ListCollapse4', 'ListCollapse5', 'ListCollapse6', 'ListCollapse7', 'ListCollapse8', 'ListCollapse9', 'ListCollapse10', 'ListCollapse11', 'ListCollapse12', 'ListCollapse13', 'ListCollapse14', 'ListCollapse15', 'ListCollapse16', 'ListCollapse17', 'ListCollapse18', 'ListCollapse19', 'ListCollapse20'],
  // 箭头图标
  arrows: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUpRight', 'ArrowDownRight', 'ArrowUpLeft', 'ArrowDownLeft', 'DoubleArrowUp', 'DoubleArrowDown', 'DoubleArrowLeft', 'DoubleArrowRight', 'Minimize', 'Maximize', 'Expand', 'Shrink', 'Fullscreen', 'ExitFullscreen', 'ZoomIn', 'ZoomOut', 'RotateCw', 'RotateCcw', 'ArrowUp2', 'ArrowDown2', 'ArrowLeft2', 'ArrowRight2', 'ArrowUpRight2', 'ArrowDownRight2', 'ArrowUpLeft2', 'ArrowDownLeft2', 'DoubleArrowUp2', 'DoubleArrowDown2', 'DoubleArrowLeft2', 'DoubleArrowRight2', 'Minimize2', 'Maximize2', 'Expand2', 'Shrink2', 'Fullscreen2', 'ExitFullscreen2', 'ZoomIn2', 'ZoomOut2', 'RotateCw2', 'RotateCcw2'],
  // 双箭头图标
  doubleArrows: ['DoubleArrowUp', 'DoubleArrowDown', 'DoubleArrowLeft', 'DoubleArrowRight', 'DoubleArrowUp2', 'DoubleArrowDown2', 'DoubleArrowLeft2', 'DoubleArrowRight2', 'DoubleArrowUp3', 'DoubleArrowDown3', 'DoubleArrowLeft3', 'DoubleArrowRight3', 'DoubleArrowUp4', 'DoubleArrowDown4', 'DoubleArrowLeft4', 'DoubleArrowRight4', 'DoubleArrowUp5', 'DoubleArrowDown5', 'DoubleArrowLeft5', 'DoubleArrowRight5'],
  // 最小化图标
  minimizes: ['Minimize', 'Minimize2', 'Minimize3', 'Minimize4', 'Minimize5', 'Minimize6', 'Minimize7', 'Minimize8', 'Minimize9', 'Minimize10', 'Minimize11', 'Minimize12', 'Minimize13', 'Minimize14', 'Minimize15', 'Minimize16', 'Minimize17', 'Minimize18', 'Minimize19', 'Minimize20'],
  // 最大化图标
  maximizes: ['Maximize', 'Maximize2', 'Maximize3', 'Maximize4', 'Maximize5', 'Maximize6', 'Maximize7', 'Maximize8', 'Maximize9', 'Maximize10', 'Maximize11', 'Maximize12', 'Maximize13', 'Maximize14', 'Maximize15', 'Maximize16', 'Maximize17', 'Maximize18', 'Maximize19', 'Maximize20'],
  // 展开图标
  expands: ['Expand', 'Expand2', 'Expand3', 'Expand4', 'Expand5', 'Expand6', 'Expand7', 'Expand8', 'Expand9', 'Expand10', 'Expand11', 'Expand12', 'Expand13', 'Expand14', 'Expand15', 'Expand16', 'Expand17', 'Expand18', 'Expand19', 'Expand20'],
  // 收缩图标
  shrinks: ['Shrink', 'Shrink2', 'Shrink3', 'Shrink4', 'Shrink5', 'Shrink6', 'Shrink7', 'Shrink8', 'Shrink9', 'Shrink10', 'Shrink11', 'Shrink12', 'Shrink13', 'Shrink14', 'Shrink15', 'Shrink16', 'Shrink17', 'Shrink18', 'Shrink19', 'Shrink20'],
  // 全屏图标
  fullscreens: ['Fullscreen', 'ExitFullscreen', 'Fullscreen2', 'ExitFullscreen2', 'Fullscreen3', 'ExitFullscreen3', 'Fullscreen4', 'ExitFullscreen4', 'Fullscreen5', 'ExitFullscreen5', 'Fullscreen6', 'ExitFullscreen6', 'Fullscreen7', 'ExitFullscreen7', 'Fullscreen8', 'ExitFullscreen8', 'Fullscreen9', 'ExitFullscreen9', 'Fullscreen10', 'ExitFullscreen10'],
  // 缩放图标
  zooms: ['ZoomIn', 'ZoomOut', 'ZoomIn2', 'ZoomOut2', 'ZoomIn3', 'ZoomOut3', 'ZoomIn4', 'ZoomOut4', 'ZoomIn5', 'ZoomOut5', 'ZoomIn6', 'ZoomOut6', 'ZoomIn7', 'ZoomOut7', 'ZoomIn8', 'ZoomOut8', 'ZoomIn9', 'ZoomOut9', 'ZoomIn10', 'ZoomOut10'],
  // 旋转图标
  rotates: ['RotateCw', 'RotateCcw', 'RotateCw2', 'RotateCcw2', 'RotateCw3', 'RotateCcw3', 'RotateCw4', 'RotateCcw4', 'RotateCw5', 'RotateCcw5', 'RotateCw6', 'RotateCcw6', 'RotateCw7', 'RotateCcw7', 'RotateCw8', 'RotateCcw8', 'RotateCw9', 'RotateCcw9', 'RotateCw10', 'RotateCcw10'],
  // 天气扩展图标
  weatherExtended: ['Sun', 'Moon', 'Cloud', 'CloudRain', 'CloudSnow', 'CloudDrizzle', 'CloudLightning', 'CloudHail', 'CloudFog', 'CloudMoon', 'CloudSun', 'Wind', 'Droplets', 'Umbrella', 'Thermometer', 'ThermometerSnowflake', 'ThermometerSun', 'Snowflake', 'Zap', 'Eye', 'Sunrise', 'Sunset', 'Compass', 'Navigation', 'Map', 'MapPin', 'MapPinOff', 'Route', 'Navigation2', 'Navigation2Off', 'Globe', 'Globe2', 'Earth', 'Planet', 'Rocket', 'Sun2', 'Moon2', 'Cloud2', 'CloudRain2', 'CloudSnow2', 'CloudDrizzle2', 'CloudLightning2', 'CloudHail2', 'CloudFog2', 'CloudMoon2', 'CloudSun2', 'Wind2', 'Droplets2', 'Umbrella2', 'Thermometer2', 'ThermometerSnowflake2', 'ThermometerSun2', 'Snowflake2', 'Zap2', 'Eye2', 'Sunrise2', 'Sunset2', 'Compass2', 'Navigation2', 'Map2', 'MapPin2', 'MapPinOff2', 'Route2', 'Navigation2', 'Navigation2Off2', 'Globe2', 'Globe2', 'Earth2', 'Planet2', 'Rocket2'],
  // 时间扩展图标
  timeExtended: ['Clock', 'Clock1', 'Clock2', 'Clock3', 'Clock4', 'Clock5', 'Clock6', 'Clock7', 'Clock8', 'Clock9', 'Clock10', 'Clock11', 'Clock12', 'Timer', 'TimerReset', 'TimerOff', 'AlarmClock', 'AlarmClockCheck', 'AlarmClockOff', 'AlarmPlus', 'AlarmMinus', 'AlarmClockPlus', 'AlarmClockMinus', 'Calendar', 'Calendar1', 'Calendar2', 'Calendar3', 'Calendar4', 'CalendarDays', 'CalendarCheck', 'CalendarClock', 'CalendarFold', 'CalendarHeart', 'CalendarMinus', 'CalendarOff', 'CalendarPlus', 'CalendarRange', 'CalendarSearch', 'CalendarX', 'History', 'Hourglass', 'HourglassEmpty', 'HourglassFull', 'Timer', 'TimerReset', 'TimerOff', 'Clock2', 'Clock12', 'Clock22', 'Clock32', 'Clock42', 'Clock52', 'Clock62', 'Clock72', 'Clock82', 'Clock92', 'Clock102', 'Clock112', 'Clock122', 'Timer2', 'TimerReset2', 'TimerOff2', 'AlarmClock2', 'AlarmClockCheck2', 'AlarmClockOff2', 'AlarmPlus2', 'AlarmMinus2', 'AlarmClockPlus2', 'AlarmClockMinus2', 'Calendar2', 'Calendar12', 'Calendar22', 'Calendar32', 'Calendar42', 'CalendarDays2', 'CalendarCheck2', 'CalendarClock2', 'CalendarFold2', 'CalendarHeart2', 'CalendarMinus2', 'CalendarOff2', 'CalendarPlus2', 'CalendarRange2', 'CalendarSearch2', 'CalendarX2', 'History2', 'Hourglass2', 'HourglassEmpty2', 'HourglassFull2', 'Timer2', 'TimerReset2', 'TimerOff2']
};

// 动态获取图标组件
export const getIcon = iconName => {
  const IconComponent = LucideIcons[iconName];
  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in lucide-react`);
    return LucideIcons.HelpCircle; // 返回默认图标
  }
  return IconComponent;
};

// 按分类获取图标
export const getIconsByCategory = category => {
  const iconNames = IconCategories[category] || [];
  return iconNames.map(name => ({
    name,
    component: getIcon(name)
  }));
};

// 搜索图标
export const searchIcons = query => {
  const allIcons = Object.keys(LucideIcons);
  return allIcons.filter(name => name.toLowerCase().includes(query.toLowerCase())).map(name => ({
    name,
    component: getIcon(name)
  }));
};

// 获取所有可用图标名称
export const getAllIconNames = () => {
  return Object.keys(LucideIcons);
};

// 检查图标是否存在
export const iconExists = iconName => {
  return iconName in LucideIcons;
};

// 图标使用统计（用于优化）
export const iconUsageStats = {
  // 记录图标使用频率
  usage: {},
  // 记录使用次数
  recordUsage(iconName) {
    this.usage[iconName] = (this.usage[iconName] || 0) + 1;
  },
  // 获取最常用的图标
  getMostUsed(limit = 10) {
    return Object.entries(this.usage).sort(([, a], [, b]) => b - a).slice(0, limit).map(([name]) => name);
  },
  // 获取使用统计
  getStats() {
    return {
      ...this.usage
    };
  }
};

// 图标缓存
export const iconCache = {
  cache: new Map(),
  // 获取缓存的图标
  get(iconName) {
    return this.cache.get(iconName);
  },
  // 设置缓存
  set(iconName, component) {
    this.cache.set(iconName, component);
  },
  // 清除缓存
  clear() {
    this.cache.clear();
  },
  // 获取缓存大小
  size() {
    return this.cache.size;
  }
};

// 默认导出
export default {
  ...LucideIcons,
  IconCategories,
  getIcon,
  getIconsByCategory,
  searchIcons,
  getAllIconNames,
  iconExists,
  iconUsageStats,
  iconCache
};
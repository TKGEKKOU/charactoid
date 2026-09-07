; CHARACTOID 安装脚本（Inno Setup 7）
; 用法：ISCC.exe scripts\CHARACTOID.iss（先运行 build_windows.ps1 生成 dist\CHARACTOID）

#define MyAppName "CHARACTOID"
#define MyAppVersion "1.0.0"
#define MyAppExeName "CHARACTOID.exe"
#define MyAppId "6B4BDE24-1C3E-4E0A-9A3D-0F0C8C7E5A21"

[Setup]
AppId={#MyAppId}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher=CHARACTOID
DefaultDirName={localappdata}\Programs\CHARACTOID
DefaultGroupName=CHARACTOID
UninstallDisplayIcon={app}\{#MyAppExeName}
UninstallDisplayName=CHARACTOID
Compression=lzma2/ultra64
SolidCompression=yes
WizardStyle=modern
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible
PrivilegesRequired=lowest
OutputDir=..\dist
OutputBaseFilename=CHARACTOID-Setup-{#MyAppVersion}
SetupIconFile=..\resources\app.ico
VersionInfoVersion={#MyAppVersion}
VersionInfoProductName=CHARACTOID

[Languages]
Name: "chinesesimplified"; MessagesFile: "compiler:Languages\ChineseSimplified.isl"
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "创建桌面快捷方式"; GroupDescription: "附加任务："

[Files]
; 程序主体（不复制开发机的 data 目录）
Source: "..\dist\CHARACTOID\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs; Excludes: "data"

[Dirs]
; 运行时数据目录为空创建，卸载时保留用户数据。
Name: "{app}\data"; Flags: uninsneveruninstall
Name: "{app}\data\live2d"; Flags: uninsneveruninstall

[Icons]
Name: "{group}\CHARACTOID"; Filename: "{app}\{#MyAppExeName}"
Name: "{group}\卸载 CHARACTOID"; Filename: "{uninstallexe}"
Name: "{autodesktop}\CHARACTOID"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "启动 CHARACTOID"; Flags: nowait postinstall skipifsilent

@echo off
setlocal enabledelayedexpansion
cd %~dp0

REM [tsc is batch file. so call command needed]
call tsc -b ./

python changeImport.py

# Automation Scripts - MediSetu

## 🚀 Quick Start

### **Option 1: Run Everything (Recommended)**
Double-click: **`RUN_ALL.bat`**
- Copies all files
- Updates all navigation
- Complete automation

### **Option 2: Step by Step**

**Step 1:** Double-click `COPY_AND_UPDATE.bat`
- Copies CSS, JS, and HTML files

**Step 2:** Double-click `UPDATE_NAVIGATION.ps1` (or run in PowerShell)
- Updates all HTML pages with Combined Navigation

## 📋 What Each Script Does

### **RUN_ALL.bat**
- Complete automation
- Copies everything
- Updates navigation
- One-click solution

### **COPY_AND_UPDATE.bat**
- Copies CSS folder
- Copies JS folder
- Copies all HTML pages
- Does NOT update navigation

### **UPDATE_NAVIGATION.ps1**
- Updates all HTML pages
- Replaces navigation with Version 3 (Combined)
- Sets active link for each page
- Requires PowerShell

### **UPDATE_NAVIGATION.bat**
- Wrapper for PowerShell script
- Shows instructions

## ⚠️ Requirements

- Windows OS
- PowerShell (for navigation update)
- Files in `MediSetu_Web_Prototype` folder

## 🎯 What Gets Updated

All HTML pages get:
- ✅ Combined Navigation (11 links)
- ✅ Active link set for current page
- ✅ All dashboard links included
- ✅ Partner link included

## 📁 Files Updated

- about.html
- register.html
- login.html
- contact.html
- partner.html
- customer.html
- doctor.html
- vendor.html
- delivery.html
- logistics.html
- help.html
- adSubmit.html
- adminAds.html

## ✅ After Running

1. Check `Combined_Pages` folder
2. Open `index.html` in browser
3. Verify navigation shows all 11 links
4. Test navigation on other pages

## 🆘 Troubleshooting

**If PowerShell script fails:**
1. Right-click `UPDATE_NAVIGATION.ps1`
2. Select "Run with PowerShell"
3. Or run: `powershell -ExecutionPolicy Bypass -File UPDATE_NAVIGATION.ps1`

**If files not found:**
- Make sure `MediSetu_Web_Prototype` folder exists
- Check file paths are correct

## 🎉 Success!

After running, all pages will have:
- ✅ Combined Navigation (11 links)
- ✅ All CSS/JS files
- ✅ Ready to use!


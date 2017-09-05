# Neustar Web Performance Script Validator
#### _Copyright (c) Neustar, Inc._

1. Introduction
2. Native Mouse and Keyboard Integration
3. Usage
4. FAQ

## Introduction

The **Neustar Web Performance Script Validator* may be used to perform
validation of JavaScript test scripts.

There are two directories:

* `bin` - contains the execution scripts used to run the validator
* `lib` - contains the Java libraries and third party components

## Download

The latest version can be downloaded from here:

  [http://static.wpm.neustar.biz/tools/local-validator.zip]
  [http://static.wpm.neustar.biz/tools/local-validator.tar.gz]

## Installing on Windows

To run scripts in Firefox, Firefox just needs to be installed.  If Firefox
doesn't launch or to run other browsers, see the following document:

  [http://community.neustar.biz/community/wpm/getting_started/blog/2012/10/02/neustar-script-local-validator-user-guide-for-windows]

## Installing on Linux

To install and run validator on Linux, see the following:

  [http://community.neustar.biz/community/wpm/tools/blog/2012/02/23/installing-the-script-validator-on-linux]

## Usage

The validator accepts parameters as documented using the `-?` option.

EXAMPLE (print options/help instructions):

    $ cd bin
    $ validator -?
    Neustar Web Performance Script Validator 4.12.44-SNAPSHOT
    Copyright (c) Neustar Inc - All Rights Reserved.
    usage: validator script [options]
     -?                    Help
     -browser <arg>        Specify browser to use (e.g. FF)
     -checktimeout         Check timeouts during test
     -keepbrowseronerror   Keep browser open if script encountered an error
     -verbose              Verbose logging.  Show items being downloaded.
     -convert <arg>        Convert HAR input file to a Basic/Virtual User script, save to <arg>

EXAMPLE (run **WPM** script):

    $ cd bin
    $ validator example-script.js

EXAMPLE (run **WPM** script with _Firefox_):

    $ cd bin
    $ validator -browser FF example-script.js


EXAMPLE (Convert Real Browser Script to Basic Script):

- Run the script normally:

    $ bin/validator -browser FF example-script.js

- Convert the output HAR file from the previous step into a basic script:

    $ bin/validator -convert har.js example-script-basic.js

In order to perform the validation procedure you must have Firefox installed.

If you wish to specify a particular location for the Firefox executable you may
do so by creating a `config.properties` file containing the following entry:

    FF=/ff/firefox.exe

Where `/ff/firefox.exe` is an absolute pathname to the Firefox executable
you wish to use for the validation process.

The `config.properties` file is commonly located in the `.wpm`
directory under your user or HOME directory.

On Windows XP/2003 this location defaults to:

    C:\Documents and Settings\<username>\.wpm

Under Windows Vista/7 this location defaults to:

    C:\Users\<username>\.wpm

Under Linux:

    $(HOME)/.wpm

Under OSX:

    $(HOME)/.wpm

## Setting a proxy

If you want to set a proxy for requests to go through you can do so by adding the following
to your ~/.wpm/config.properties file:

script.proxy.host=proxy.myhost.com
script.proxy.port=8080
script.proxy.user=<optional_username_goes_here>
script.proxy.password=<optional_password_goes_here>


##  Modifing the Firefox profile

By default a new, fresh Firefox profile is created every time a test is ran.

This profile won't have any extensions or settings from your normal Firefox profile

It is sometimes useful to add extensions or change settings to aide debugging of the
script.  To create a custom profile for validating scripts:

1. Create a new profile, by launching Firefox with -profile

 "c:/Program Files/Mozilla Firefox/firefox.exe" -ProfileManager

2. Choose a name for the new profile and choose the location to save the profile.  This
   location should to be added to the config.properties file in step 4.

3. Launch Firefox with the custom profile and add extensions/change settings as desired.

4. Set the path to your profile in the config.properties file.  Note it is important to
ensure there are no quotes around the path name.

$(HOME)/.wpm

  firefox.profile.dir = C:/<firefox-profile-dir>

##  Native Mouse and Keyboard Integration

In order to use native mouse and keyboard integration you will need to
complete the installation by downloading a copy of the open source
browsermob-vnc library and installing it in the lib directory.
(see [this BrowserMob blog](http://blog.browsermob.com/2009/12/flash-and-flex-automation-options-using-selenium/)
for more details)

You can download a copy of the Open Source BrowserMob VNC library
[from here](http://search.maven.org/remotecontent?filepath=org/browsermob/browsermob-vnc/1.0-beta-1/browsermob-vnc-1.0-beta-1.jar).

Once downloaded, copy the file to the lib directory.

Before you can use the VNC library, you need to have a VNC server
running (e.g. [Vine Server](http://sourceforge.net/projects/osxvnc/) for OS X,
or [Ultra VNC](http://www.uvnc.com/) for Windows).

## FAQ

#### Q: Does the script validator runs Firefox with using my configuration? ####
A: No. It creates a new, fresh Firefox profile everytime and runs the test in it.
   However you can tell script validator to copy all your Firefox settings and
   extension from a given profile.  See 'Modifing the Firefox profile' above.

#### Q: How can run with Firebug? ####
A: You can create a custom profile to use with the script validator, then install
   Firebug there.  See 'Modifing the Firefox profile' above.

#### Q: Which version of Firefox do I need? ####
A: Currently we use Firefox version 31.6 ESR.  It can be downloaded here:

http://www.mozilla.org/en-US/firefox/organizations/all/


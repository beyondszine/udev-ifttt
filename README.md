# udev-ifttt

- This aims to automate stuff around udev in linux.
- For all those who find it sometimes hard/keeps on forgetting or just don;t want to bother with udev rules and awful ways to get udev rules working.

How it works:

1. Pick your subsystem. For ex: tty
2. Pick your trigger events i.e. On 'addtion', 'deletion' or 'change' on this subsystem.
3. Pick your executable file to run on above event.

Ex:
- If a tty is added, you need to get an alert, in case someone without letting you know gets the shell.
- If a particular storage device is added/removed, run my rsync.

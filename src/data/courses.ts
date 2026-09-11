import { Course } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'cyber-fundamentals',
    slug: 'cybersecurity-fundamentals',
    title: 'Cybersecurity Fundamentals',
    description: 'Master core principles of information security: CIA triad, access control, threat models, and fundamental defensive controls.',
    difficulty: 'Beginner',
    estimatedTime: '3.5 Hours',
    iconName: 'ShieldCheck',
    tag: 'Core Foundation',
    totalLessons: 8,
    lessons: [
      {
        id: 'cf-l1',
        courseId: 'cyber-fundamentals',
        order: 1,
        title: '1. Introduction to Cybersecurity',
        duration: '20 min',
        summary: 'Understand the landscape of modern cyber defense, attacker motivations, and why security is a proactive engineering discipline.',
        contentSections: [
          {
            title: 'What is Cybersecurity?',
            body: 'Cybersecurity is the discipline of protecting critical networks, devices, software programs, and sensitive data from digital unauthorized access, damage, espionage, or disruption. Rather than just erecting perimeter firewalls, modern defense requires a defense-in-depth posture spanning physical, administrative, and technical domains.',
            callout: {
              type: 'concept',
              text: 'Remember: In cyber defense, attackers only need to find one flaw to breach a system, whereas defenders must protect all possible attack vectors 24/7.'
            }
          },
          {
            title: 'The Hacker Mindset & Vectors',
            body: 'Threat actors range from casual script kiddies using automated tools to sophisticated Advanced Persistent Threat (APT) nation-state groups. Vectors typically include phishing, misconfigured cloud storage, vulnerable software dependencies, and unpatched CVEs (Common Vulnerabilities and Exposures).'
          },
          {
            title: 'Key Industry Standards',
            body: 'Security professionals align their defenses using recognized frameworks including NIST CSF (National Institute of Standards and Technology Cybersecurity Framework), ISO/IEC 27001, and CIS Critical Security Controls.'
          }
        ],
        task: {
          id: 'task-cf-l1',
          title: 'Lab 1: Cyber Defense First Principles',
          prompt: 'Identify the common industry standard framework established by NIST for cybersecurity defense.',
          type: 'input',
          practicalContext: 'Inspect the system documentation. Enter the 3-letter acronym of the National Institute of Standards and Technology, or the framework name.',
          hints: ['Think of the US institute: N _ _ T CSF', 'Answer is NIST or NIST CSF'],
          xp: 50,
          expectedAnswers: ['NIST', 'NIST CSF', 'NIST-CSF'],
          explanationOnSuccess: 'Correct! The NIST Cybersecurity Framework (Identify, Protect, Detect, Respond, Recover) is a benchmark for security programs worldwide.'
        }
      },
      {
        id: 'cf-l2',
        courseId: 'cyber-fundamentals',
        order: 2,
        title: '2. CIA Triad',
        duration: '25 min',
        summary: 'Explore Confidentiality, Integrity, and Availability—the bedrock triad that guides every cybersecurity architecture.',
        contentSections: [
          {
            title: 'The Three Pillars of Information Security',
            body: 'The CIA Triad forms the foundational evaluation model for every data asset and vulnerability assessment:\n\n• Confidentiality: Ensuring that information is accessible only to those authorized to view it (Encryption, Access Control Lists, MFA).\n• Integrity: Guarding the accuracy and completeness of information against tampering (Cryptographic Hashes like SHA-256, Digital Signatures, Version Control).\n• Availability: Ensuring authorized users have reliable and timely access to information and resources (Redundancy, Backups, DDoS Mitigation, Failover Clusters).',
            callout: {
              type: 'tip',
              text: 'Whenever analyzing a security incident, identify which branch of the CIA Triad was compromised.'
            }
          },
          {
            title: 'Real-World Breaches vs CIA Triad',
            body: 'A ransomware attack that encrypts patient records breaches Availability. A SQL injection leaking customer credit cards breaches Confidentiality. An attacker modifying bank balances breaches Integrity.'
          }
        ],
        task: {
          id: 'task-cf-l2',
          title: 'Lab 2: Breach Classification',
          prompt: 'A DDoS attack brings down an e-commerce payment gateway for 6 hours. Which pillar of the CIA Triad is directly compromised? (Enter Confidentiality, Integrity, or Availability)',
          type: 'input',
          practicalContext: 'Analyze the symptom: legitimate customers cannot access the service due to network flooding.',
          hints: ['Does it steal secret data? No. Does it tamper with data? No. Does it prevent access?', 'Starts with letter A'],
          xp: 60,
          expectedAnswers: ['Availability', 'availability'],
          explanationOnSuccess: 'Spot on! Denial of Service targets Availability by overwhelming system resources so legitimate users cannot reach them.'
        }
      },
      {
        id: 'cf-l3',
        courseId: 'cyber-fundamentals',
        order: 3,
        title: '3. Authentication',
        duration: '25 min',
        summary: 'Understand proof of identity, password hashing, multi-factor authentication (MFA), and modern protocols like OAuth and WebAuthn.',
        contentSections: [
          {
            title: 'Authentication vs Identification',
            body: 'Identification is claiming who you are (e.g. your username). Authentication is proving you are who you claim to be (e.g. presenting a cryptographic secret or biometric proof).'
          },
          {
            title: 'The Three Factors of Authentication',
            body: '1. Something you KNOW: Passwords, PINs, secret security questions.\n2. Something you HAVE: Hardware security key (YubiKey), Time-based OTP app (TOTP like Google Authenticator), SMS token.\n3. Something you ARE: Biometrics (Fingerprint scanner, Facial recognition, Retina scan).',
            callout: {
              type: 'warning',
              text: 'SMS-based 2FA is vulnerable to SIM-swapping attacks. Hardware FIDO2 keys and authenticator apps provide far superior resistance.'
            }
          },
          {
            title: 'Password Storage: Salting & Hashing',
            body: 'Never store plain text passwords! Passwords must be hashed using computationally heavy key-stretching algorithms like Argon2id, bcrypt, or PBKDF2 with a unique cryptographic salt per user to prevent Rainbow Table attacks.'
          }
        ],
        task: {
          id: 'task-cf-l3',
          title: 'Lab 3: Identifying Multi-Factor Setup',
          prompt: 'A login system requires entering a password and scanning a fingerprint. How many distinct authentication factor categories are being used?',
          type: 'input',
          practicalContext: 'Evaluate: Password is "Something you know". Fingerprint is "Something you are".',
          hints: ['Count the distinct categories from: Something you know, have, or are.', 'Enter the digit (e.g. 2)'],
          xp: 60,
          expectedAnswers: ['2', 'two', '2 factors'],
          explanationOnSuccess: 'Excellent! Two distinct factor categories are used ("know" and "are"), satisfying genuine Two-Factor Authentication (2FA).'
        }
      },
      {
        id: 'cf-l4',
        courseId: 'cyber-fundamentals',
        order: 4,
        title: '4. Authorization',
        duration: '25 min',
        summary: 'Learn how permissions are enforced after identity is verified: RBAC, ABAC, and the Principle of Least Privilege.',
        contentSections: [
          {
            title: 'The Principle of Least Privilege (PoLP)',
            body: 'Users, services, and applications should be granted only the minimum necessary privileges required to fulfill their specific job duties—and for no longer than needed.',
            callout: {
              type: 'alert',
              text: 'Running regular day-to-day desktop tasks as root or Domain Admin violates Least Privilege and magnifies malware infection risk.'
            }
          },
          {
            title: 'Access Control Models',
            body: '• Role-Based Access Control (RBAC): Permissions assigned to roles (Admin, Editor, Viewer). Users receive permissions via role membership.\n• Attribute-Based Access Control (ABAC): Dynamic decisions based on user department, time of day, client device health, and geographic IP location.\n• Discretionary (DAC) vs Mandatory Access Control (MAC): DAC allows owners to set file permissions (like Linux chmod), whereas MAC is enforced strictly by system policy (like SELinux).'
          }
        ],
        task: {
          id: 'task-cf-l4',
          title: 'Lab 4: Access Control Principle',
          prompt: 'What core security principle dictates that an employee or process should only have access to the specific resources essential for their immediate role?',
          type: 'input',
          practicalContext: 'Often abbreviated as PoLP or referred to as "least privilege".',
          hints: ['Starts with "Least ..."', 'Principle of Least Privilege'],
          xp: 60,
          expectedAnswers: ['Principle of Least Privilege', 'Least Privilege', 'Least privilege', 'polp', 'PoLP'],
          explanationOnSuccess: 'Correct! Least Privilege drastically reduces the blast radius when an account or token is compromised.'
        }
      },
      {
        id: 'cf-l5',
        courseId: 'cyber-fundamentals',
        order: 5,
        title: '5. Network Security Basics',
        duration: '30 min',
        summary: 'Get comfortable with IP addressing, ports, subnets, routers, firewalls, and encrypted transmission protocols.',
        contentSections: [
          {
            title: 'Ports & Protocols Primer',
            body: 'Network services listen on specific TCP/UDP ports:\n• Port 22: SSH (Secure Shell - encrypted remote shell)\n• Port 53: DNS (Domain Name System)\n• Port 80: HTTP (Unencrypted web traffic)\n• Port 443: HTTPS (Encrypted HTTP over TLS)\n• Port 3389: RDP (Remote Desktop Protocol)',
            callout: {
              type: 'concept',
              text: 'Attackers routinely scan the top 1000 ports to locate open listening daemons with known vulnerabilities.'
            }
          },
          {
            title: 'Network Defense Mechanisms',
            body: 'Firewalls inspect packets (stateless or stateful), IDS (Intrusion Detection Systems) alert on signatures, and IPS (Intrusion Prevention Systems) drop hostile packets in real time.'
          }
        ],
        task: {
          id: 'task-cf-l5',
          title: 'Lab 5: Port Identification Challenge',
          prompt: 'Which standard TCP port number is utilized for Secure Shell (SSH) remote administrative access?',
          type: 'input',
          practicalContext: 'Identify the well-known TCP port for SSH.',
          hints: ['It is a two-digit number under 30.', 'Enter "22"'],
          xp: 60,
          expectedAnswers: ['22', 'port 22', 'Port 22'],
          explanationOnSuccess: 'Correct! TCP Port 22 is the standard port for encrypted SSH traffic.'
        }
      },
      {
        id: 'cf-l6',
        courseId: 'cyber-fundamentals',
        order: 6,
        title: '6. Common Cyber Threats',
        duration: '30 min',
        summary: 'Deep dive into malware families (Trojan, Ransomware, Worms), social engineering, phishing techniques, and zero-day vulnerabilities.',
        contentSections: [
          {
            title: 'Malware Taxonomy',
            body: '• Ransomware: Encrypts files and demands cryptocurrency payment for the decryption key.\n• Spyware / Keylogger: Silently records keystrokes and transmits credentials.\n• Worm: Self-replicating malware that spreads across network subnets without human intervention (e.g. WannaCry, Conficker).\n• Trojan Horse: Disguised as legitimate software to deceive users into executing it.'
          },
          {
            title: 'Social Engineering: The Human Factor',
            body: 'Humans remain the most frequently exploited attack vector. Phishing (email deception), Spear Phishing (targeted against specific individuals), Smishing (SMS phishing), and Vishing (voice phishing) deceive targets into clicking weaponized links or revealing credentials.'
          }
        ],
        task: {
          id: 'task-cf-l6',
          title: 'Lab 6: Threat Analysis',
          prompt: 'What type of malware is characterized by its ability to self-replicate and spread across computer networks automatically without requiring human user action?',
          type: 'input',
          practicalContext: 'Differentiate between a virus (requires file execution) and this self-spreading entity.',
          hints: ['Named after a crawling organism.', 'Worm'],
          xp: 60,
          expectedAnswers: ['Worm', 'worm', 'Worms', 'network worm'],
          explanationOnSuccess: 'Spot on! Worms like WannaCry or Slammer exploit network protocol vulnerabilities to self-propagate automatically.'
        }
      },
      {
        id: 'cf-l7',
        courseId: 'cyber-fundamentals',
        order: 7,
        title: '7. Security Controls',
        duration: '30 min',
        summary: 'Categorize security controls into Preventive, Detective, and Corrective, while understanding Defense-in-Depth layers.',
        contentSections: [
          {
            title: 'Functional Control Types',
            body: '• Preventive: Stops a threat from succeeding (e.g. Firewalls, MFA, IPS, strong password policies).\n• Detective: Discovers and alerts when an incident occurs (e.g. SIEM log alarms, IDS, CCTV, file integrity monitors).\n• Corrective: Restores systems and remediates damage after an incident (e.g. Disaster recovery backups, patch deployment, incident response playbooks).'
          },
          {
            title: 'Defense in Depth Architecture',
            body: 'Also known as the "Castle Approach", defense in depth ensures that if an attacker bypasses one barrier (e.g. perimeter firewall), they immediately encounter another barrier (e.g. host endpoint EDR, micro-segmentation, zero-trust token verification).'
          }
        ],
        task: {
          id: 'task-cf-l7',
          title: 'Lab 7: Security Control Categorization',
          prompt: 'An organization deploys automated off-site immutable data backups to restore databases after a malware infection. Is this a Preventive, Detective, or Corrective control?',
          type: 'input',
          practicalContext: 'Categorize the control based on its primary function in the incident timeline.',
          hints: ['Does it stop the attack? No. Does it detect it? No. Does it restore/remedy damage?', 'Corrective'],
          xp: 75,
          expectedAnswers: ['Corrective', 'corrective', 'Corrective control'],
          explanationOnSuccess: 'Awesome work! Backups are Corrective controls designed to remediate impact and restore normal business operations.'
        }
      },
      {
        id: 'cf-l8',
        courseId: 'cyber-fundamentals',
        order: 8,
        title: '8. Final Assessment',
        duration: '35 min',
        summary: 'Synthesize your cybersecurity foundational knowledge in an interactive multi-question verification challenge to complete the course.',
        contentSections: [
          {
            title: 'Capstone Mission: Incident Response Review',
            body: 'You are an analyst reviewing a security incident report:\n\n"At 03:14 UTC, external threat actor APT-33 leveraged a stolen contractor credential without MFA to access internal jump boxes, exfiltrated customer records, and attempted to overwrite system logs using a compromised privileged service account."'
          },
          {
            title: 'Graduation Checklist',
            body: 'Verify your answer to claim the course completion badge and unlock the Cybersecurity Fundamentals Certificate.'
          }
        ],
        task: {
          id: 'task-cf-l8',
          title: 'Capstone Assessment: Master Flag',
          prompt: 'To prove mastery of course 1, enter the verification flag: FLAG{cia_defense_in_depth}',
          type: 'flag',
          practicalContext: 'Copy and verify the capstone flag to finalize your credentials.',
          hints: ['The flag is given in the prompt: FLAG{cia_defense_in_depth}'],
          xp: 150,
          expectedAnswers: ['FLAG{cia_defense_in_depth}', 'flag{cia_defense_in_depth}'],
          explanationOnSuccess: 'CONGRATULATIONS! You have mastered Cybersecurity Fundamentals and earned your course completion certificate!'
        }
      }
    ]
  },
  {
    id: 'linux-cyber',
    slug: 'linux-for-cybersecurity',
    title: 'Linux for Cybersecurity',
    description: 'Master the command line, file system architecture, user permissions, process analysis, and log auditing essential for penetration testing and forensics.',
    difficulty: 'Beginner',
    estimatedTime: '4.0 Hours',
    iconName: 'Terminal',
    tag: 'Hands-On CLI',
    totalLessons: 6,
    lessons: [
      {
        id: 'linux-l1',
        courseId: 'linux-cyber',
        order: 1,
        title: '1. Linux File System & Navigation',
        duration: '30 min',
        summary: 'Explore the root directory tree (/etc, /var, /bin, /dev, /home) and master navigation commands like ls, cd, pwd, and file inspection.',
        contentSections: [
          {
            title: 'The Linux Directory Structure',
            body: 'Unlike Windows with drive letters (C:\\, D:\\), Linux uses a single unified hierarchical tree starting at root (/):\n• /etc: Critical system configuration files (e.g. /etc/passwd, /etc/shadow)\n• /var/log: System and daemon event logs\n• /bin & /sbin: Essential binary executables\n• /home & /root: User and superuser home directories\n• /tmp: Temporary files (often world-writable, common target for attackers)'
          },
          {
            title: 'Essential Navigation Commands',
            body: '`pwd` (print working directory), `ls -la` (list all files including hidden with permissions), `cd` (change directory), `cat` (concatenate and display file), `head` / `tail` (view beginning/end of files).'
          }
        ],
        task: {
          id: 'task-linux-l1',
          title: 'Interactive Terminal: Read Root Secret',
          prompt: 'Execute a command to view the contents of the secret file located at /etc/secret.txt. (Simulated CLI: type "cat /etc/secret.txt")',
          type: 'terminal',
          practicalContext: 'Use standard Linux utility to read the target file.',
          hints: ['Type: cat /etc/secret.txt'],
          xp: 60,
          expectedAnswers: ['cat /etc/secret.txt', 'cat /etc/secret.txt;', 'more /etc/secret.txt'],
          terminalPrompt: 'student@rajhackme:~$',
          terminalContext: {
            files: {
              '/etc/secret.txt': 'FLAG{linux_root_hierarchy_mastered}',
              '/etc/passwd': 'root:x:0:0:root:/root:/bin/bash\nstudent:x:1000:1000:Student:/home/student:/bin/bash'
            },
            availableCommands: ['ls', 'pwd', 'cat', 'cd', 'whoami', 'clear']
          },
          explanationOnSuccess: 'Terminal command executed successfully! Flag revealed: FLAG{linux_root_hierarchy_mastered}'
        }
      },
      {
        id: 'linux-l2',
        courseId: 'linux-cyber',
        order: 2,
        title: '2. Permissions & Ownership',
        duration: '35 min',
        summary: 'Decode read, write, execute (rwx) octal permissions, SUID bits, and privilege escalation vectors.',
        contentSections: [
          {
            title: 'Decoding Octal Permissions',
            body: 'Permissions are represented by triples for User (u), Group (g), and Others (o):\n• Read (r) = 4\n• Write (w) = 2\n• Execute (x) = 1\n\nExample: `chmod 755 script.sh` gives User rwx (7), Group r-x (5), Others r-x (5).'
          },
          {
            title: 'Special Permissions: SUID (SetUID)',
            body: 'When an executable has the SUID bit set (represented by `s` in user permissions like `-rwsr-xr-x`), it executes with the privileges of the file owner (often root) rather than the executing user. Misconfigured SUID binaries are a primary vector for Linux Privilege Escalation!'
          }
        ],
        task: {
          id: 'task-linux-l2',
          title: 'Permission Math Lab',
          prompt: 'What numeric 3-digit octal value gives the owner Read & Write (no execute), while giving group and others Read-only access?',
          type: 'input',
          practicalContext: 'Owner: 4 + 2 = 6. Group: 4. Others: 4.',
          hints: ['Owner=6, Group=4, Others=4', 'Enter "644"'],
          xp: 70,
          expectedAnswers: ['644'],
          explanationOnSuccess: 'Correct! 644 is the standard secure permission for non-executable configuration files and web assets.'
        }
      },
      {
        id: 'linux-l3',
        courseId: 'linux-cyber',
        order: 3,
        title: '3. Process Management & Services',
        duration: '30 min',
        summary: 'Inspect active processes with ps and top, investigate suspicious background daemons, and manage services with systemctl.',
        contentSections: [
          {
            title: 'Process Inspection',
            body: 'Security analysts must swiftly identify unauthorized processes:\n• `ps aux`: Lists all running processes with user, PID, CPU/MEM usage, and invocation command\n• `top` / `htop`: Real-time interactive resource monitor\n• `kill -9 <PID>`: Forcefully terminates a rogue process'
          }
        ],
        task: {
          id: 'task-linux-l3',
          title: 'Process Analysis Lab',
          prompt: 'Which Linux command lists all running processes for all users in full format? (Format: ps ...)',
          type: 'input',
          practicalContext: 'The classic 3-letter flag combination for ps.',
          hints: ['Commonly memorized as "ps aux" or "ps -ef"', 'Type "ps aux"'],
          xp: 60,
          expectedAnswers: ['ps aux', 'ps -ef'],
          explanationOnSuccess: 'Great job! `ps aux` provides complete visibility into running programs across the entire operating system.'
        }
      },
      {
        id: 'linux-l4',
        courseId: 'linux-cyber',
        order: 4,
        title: '4. Network Commands & Netcat',
        duration: '35 min',
        summary: 'Learn netstat, ss, ip, and how to use Netcat (the Swiss Army knife) to test port connectivity and transfer files.',
        contentSections: [
          {
            title: 'Socket and Port Inspection',
            body: '`ss -tulpn` displays all active listening TCP and UDP sockets along with their process names and PID. This immediately reveals backdoors listening on unusual high ports (e.g. port 4444 or 1337).'
          },
          {
            title: 'Netcat (nc)',
            body: 'Netcat allows reading and writing raw data across network connections. It is frequently used for port banner grabbing: `nc -vn 192.168.1.50 80`.'
          }
        ],
        task: {
          id: 'task-linux-l4',
          title: 'Socket Inspection Command',
          prompt: 'Which modern command is the recommended replacement for netstat to display listening sockets and ports? (2-letter command name)',
          type: 'input',
          practicalContext: 'Socket Statistics utility.',
          hints: ['Two letters: "ss"', 'Stands for Socket Statistics'],
          xp: 60,
          expectedAnswers: ['ss', 'ss command'],
          explanationOnSuccess: 'Correct! The `ss` utility provides faster and richer socket statistics than legacy `netstat`.'
        }
      },
      {
        id: 'linux-l5',
        courseId: 'linux-cyber',
        order: 5,
        title: '5. Bash Scripting for Security',
        duration: '40 min',
        summary: 'Automate security tasks: ping sweeps, automated log parsing, and simple vulnerability check scripts in Bash.',
        contentSections: [
          {
            title: 'Automating Security Tasks',
            body: 'Writing quick bash one-liners saves hours during assessments:\n```bash\nfor ip in $(seq 1 254); do\n  ping -c 1 10.10.10.$ip | grep "64 bytes" & \ndone\n```\nThis one-liner quickly identifies live hosts on a /24 subnet.'
          }
        ],
        task: {
          id: 'task-linux-l5',
          title: 'Bash Shebang Verification',
          prompt: 'What standard shebang line must be placed at the very first line of a bash script to specify the interpreter?',
          type: 'input',
          practicalContext: 'Starts with #! followed by the path to bash.',
          hints: ['Starts with #!/bin/bash', '#!/bin/bash'],
          xp: 75,
          expectedAnswers: ['#!/bin/bash', '#! /bin/bash'],
          explanationOnSuccess: 'Correct! The shebang informs the operating system loader to execute the file using the Bash binary.'
        }
      },
      {
        id: 'linux-l6',
        courseId: 'linux-cyber',
        order: 6,
        title: '6. Linux Log Analysis & Forensics',
        duration: '45 min',
        summary: 'Investigate /var/log/auth.log and secure logs to spot brute-force SSH attacks and unauthorized sudo escalations.',
        contentSections: [
          {
            title: 'Critical Log Locations',
            body: '• `/var/log/auth.log` (Debian/Ubuntu) or `/var/log/secure` (RHEL/CentOS): Logs authentication events, SSH logins, and sudo attempts.\n• `grep "Failed password" /var/log/auth.log`: Filters all failed login attempts, exposing brute-force attacks and origin IPs.'
          }
        ],
        task: {
          id: 'task-linux-l6',
          title: 'Log Forensic Flag Submission',
          prompt: 'Enter the verification flag found after analyzing suspicious sudo activity: FLAG{linux_log_forensic_pro}',
          type: 'flag',
          practicalContext: 'Submit the verified forensic flag to complete Linux for Cybersecurity.',
          hints: ['FLAG{linux_log_forensic_pro}'],
          xp: 150,
          expectedAnswers: ['FLAG{linux_log_forensic_pro}'],
          explanationOnSuccess: 'Course Complete! You have mastered Linux CLI security operations!'
        }
      }
    ]
  },
  {
    id: 'network-security',
    slug: 'network-security',
    title: 'Network Security',
    description: 'Deep dive into packet analysis, Wireshark, Nmap port scanning, firewall architectures, and mitigating MITM attacks.',
    difficulty: 'Intermediate',
    estimatedTime: '4.5 Hours',
    iconName: 'Network',
    tag: 'Infrastructure Defense',
    totalLessons: 6,
    lessons: [
      {
        id: 'net-l1',
        courseId: 'network-security',
        order: 1,
        title: '1. OSI Model & TCP/IP Stack',
        duration: '35 min',
        summary: 'Map security controls to the 7 layers of the OSI model: from physical layer taps to application layer WAFs.',
        contentSections: [
          {
            title: 'OSI 7 Layers vs Attacks',
            body: '• Layer 7 (Application): HTTP, DNS, SMTP -> Attacks: SQLi, XSS, HTTP floods\n• Layer 4 (Transport): TCP, UDP -> Attacks: SYN Floods, Port Scanning\n• Layer 3 (Network): IPv4, IPv6, ICMP -> Attacks: IP Spoofing, Ping of Death\n• Layer 2 (Data Link): Ethernet, MAC, ARP -> Attacks: ARP Poisoning, MAC flooding'
          }
        ],
        task: {
          id: 'task-net-l1',
          title: 'Layer Identification',
          prompt: 'At which OSI layer does an IP address operate? (Enter layer number 1-7 or name)',
          type: 'input',
          practicalContext: 'Layer 1: Physical, Layer 2: Data Link, Layer 3: Network, etc.',
          hints: ['Layer 3 or Network', 'Enter "3" or "Network"'],
          xp: 60,
          expectedAnswers: ['3', 'Network', 'Layer 3', 'layer 3', 'network'],
          explanationOnSuccess: 'Correct! The Network Layer (Layer 3) handles logical packet routing and IP addressing.'
        }
      },
      {
        id: 'net-l2',
        courseId: 'network-security',
        order: 2,
        title: '2. Port Scanning with Nmap',
        duration: '40 min',
        summary: 'Learn stealth SYN scans (-sS), service version detection (-sV), and OS fingerprinting (-O) with Nmap.',
        contentSections: [
          {
            title: 'The TCP 3-Way Handshake & SYN Scanning',
            body: 'In a full TCP connection: Client sends SYN -> Server responds SYN-ACK -> Client completes with ACK.\nIn a SYN Stealth Scan (`nmap -sS`), the client sends a RST (Reset) immediately upon receiving SYN-ACK. The connection is never fully established, reducing log noise on older servers!'
          }
        ],
        task: {
          id: 'task-net-l2',
          title: 'Nmap Flag Challenge',
          prompt: 'Which Nmap command switch enables Service Version Detection? (e.g. -s_ )',
          type: 'input',
          practicalContext: 'Inspect the switch: -s followed by uppercase letter.',
          hints: ['-sV', 'V stands for Version'],
          xp: 75,
          expectedAnswers: ['-sV', '-sv', 'sV'],
          explanationOnSuccess: 'Spot on! The `-sV` flag interrogates open ports to determine the exact software banner and version running.'
        }
      },
      {
        id: 'net-l3',
        courseId: 'network-security',
        order: 3,
        title: '3. Wireshark & Packet Analysis',
        duration: '45 min',
        summary: 'Capture PCAPs, filter unencrypted credentials, and reconstruct TCP conversations in Wireshark.',
        contentSections: [
          {
            title: 'PCAP Analysis Techniques',
            body: 'Wireshark display filters isolate suspicious traffic in seconds:\n• `http.request.method == "POST"`: Isolates form submissions like login requests\n• `tcp.flags.syn == 1 and tcp.flags.ack == 0`: Identifies initial connection SYN packets\n• `dns.flags.response == 1`: Shows DNS resolution responses'
          }
        ],
        task: {
          id: 'task-net-l3',
          title: 'Wireshark Protocol Filter',
          prompt: 'What filter expression in Wireshark displays only Domain Name System traffic? (Enter protocol name in lowercase)',
          type: 'input',
          practicalContext: 'Type the short protocol name.',
          hints: ['dns'],
          xp: 70,
          expectedAnswers: ['dns', 'DNS'],
          explanationOnSuccess: 'Correct! Simply entering `dns` filters the packet list to show DNS queries and responses.'
        }
      },
      {
        id: 'net-l4',
        courseId: 'network-security',
        order: 4,
        title: '4. Firewalls & IDS/IPS Systems',
        duration: '35 min',
        summary: 'Compare stateless vs stateful packet inspection, Next-Gen Firewalls (NGFW), and signature-based Snort/Suricata rules.',
        contentSections: [
          {
            title: 'Stateful vs Stateless Firewalls',
            body: 'A stateful firewall tracks the entire lifecycle of a connection. If an outbound request was initiated, the inbound reply packet is automatically recognized as part of an established stream and permitted through.'
          }
        ],
        task: {
          id: 'task-net-l4',
          title: 'Firewall Concept Lab',
          prompt: 'What term describes a firewall that monitors the active state and context of network connections rather than evaluating packets in isolation?',
          type: 'input',
          practicalContext: 'Stateful vs Stateless.',
          hints: ['Stateful', 'Starts with "State..."'],
          xp: 70,
          expectedAnswers: ['Stateful', 'stateful', 'stateful firewall'],
          explanationOnSuccess: 'Correct! Stateful packet inspection (SPI) maintains a dynamic connection state table.'
        }
      },
      {
        id: 'net-l5',
        courseId: 'network-security',
        order: 5,
        title: '5. Man-in-the-Middle (MITM) & ARP Spoofing',
        duration: '40 min',
        summary: 'Examine ARP cache poisoning, how attackers intercept unencrypted local network traffic, and how DAI (Dynamic ARP Inspection) stops it.',
        contentSections: [
          {
            title: 'How ARP Poisoning Works',
            body: 'Because ARP lacks built-in authentication, an attacker can broadcast unsolicited ARP replies claiming their MAC address belongs to the default gateway IP. Switches and workstations accept this, funneling all traffic through the attacker machine.'
          }
        ],
        task: {
          id: 'task-net-l5',
          title: 'MITM Defense Switch Feature',
          prompt: 'What Cisco switch security feature inspects ARP packets on untrusted ports to prevent ARP poisoning? (Acronym: DAI)',
          type: 'input',
          practicalContext: 'Dynamic ARP Inspection.',
          hints: ['Dynamic ARP Inspection', 'DAI'],
          xp: 80,
          expectedAnswers: ['DAI', 'Dynamic ARP Inspection', 'dai'],
          explanationOnSuccess: 'Correct! Dynamic ARP Inspection (DAI) uses the DHCP snooping binding database to validate ARP packets.'
        }
      },
      {
        id: 'net-l6',
        courseId: 'network-security',
        order: 6,
        title: '6. Securing DNS & TLS Handshakes',
        duration: '40 min',
        summary: 'Implement DNSSEC to prevent DNS cache poisoning and inspect the TLS 1.3 cryptographic handshake.',
        contentSections: [
          {
            title: 'TLS 1.3 & Forward Secrecy',
            body: 'Modern TLS enforces Perfect Forward Secrecy (PFS) via Ephemeral Diffie-Hellman (DHE/ECDHE), ensuring that even if the server private key is compromised in the future, previously recorded sessions cannot be decrypted.'
          }
        ],
        task: {
          id: 'task-net-l6',
          title: 'Network Capstone Flag',
          prompt: 'Submit the network verification flag: FLAG{wireshark_pcap_ninja_verified}',
          type: 'flag',
          practicalContext: 'Submit the final flag to complete Network Security.',
          hints: ['FLAG{wireshark_pcap_ninja_verified}'],
          xp: 150,
          expectedAnswers: ['FLAG{wireshark_pcap_ninja_verified}'],
          explanationOnSuccess: 'Outstanding! Network Security course completed!'
        }
      }
    ]
  },
  {
    id: 'web-security',
    slug: 'web-security',
    title: 'Web Security',
    description: 'Explore the OWASP Top 10 vulnerabilities: SQL Injection, Cross-Site Scripting (XSS), CSRF, IDOR, and secure code architecture.',
    difficulty: 'Intermediate',
    estimatedTime: '5.0 Hours',
    iconName: 'Globe',
    tag: 'AppSec & OWASP',
    totalLessons: 6,
    lessons: [
      {
        id: 'web-l1',
        courseId: 'web-security',
        order: 1,
        title: '1. HTTP Basics & Security Headers',
        duration: '35 min',
        summary: 'Understand HTTP methods, status codes, cookies, and hardening headers like Content-Security-Policy and HSTS.',
        contentSections: [
          {
            title: 'Critical HTTP Security Headers',
            body: '• `Content-Security-Policy (CSP)`: Dictates trusted sources of executable scripts, stopping XSS.\n• `Strict-Transport-Security (HSTS)`: Enforces HTTPS connections exclusively.\n• `X-Frame-Options: DENY`: Prevents Clickjacking attacks by forbidding iframe embedding.\n• `Set-Cookie: HttpOnly; Secure; SameSite=Strict`: Prevents JavaScript from reading session tokens.'
          }
        ],
        task: {
          id: 'task-web-l1',
          title: 'Cookie Security Flag Lab',
          prompt: 'Which cookie attribute prevents client-side JavaScript (document.cookie) from accessing session tokens, mitigating cookie-theft XSS?',
          type: 'input',
          practicalContext: 'One of: HttpOnly, Secure, or SameSite.',
          hints: ['HttpOnly', 'It prevents scripts from accessing HTTP cookies'],
          xp: 65,
          expectedAnswers: ['HttpOnly', 'httponly'],
          explanationOnSuccess: 'Spot on! The HttpOnly flag instructs browsers that the cookie must not be accessible via DOM document.cookie.'
        }
      },
      {
        id: 'web-l2',
        courseId: 'web-security',
        order: 2,
        title: '2. Cross-Site Scripting (XSS)',
        duration: '45 min',
        summary: 'Learn Reflected, Stored, and DOM-based XSS, how attackers hijack sessions, and how contextual output encoding stops it.',
        contentSections: [
          {
            title: 'Types of XSS',
            body: '• Stored XSS: The malicious script is permanently stored in the application database (e.g. blog comments) and executed whenever other users view the page.\n• Reflected XSS: Malicious payload is reflected off a web server in an error message or search query URL.\n• DOM-based XSS: Vulnerability resides entirely in client-side script processing untrusted data into an unsafe sink like `innerHTML` or `eval()`.'
          }
        ],
        task: {
          id: 'task-web-l2',
          title: 'XSS Detection Challenge',
          prompt: 'A comment box renders user input using "element.innerHTML = userInput" without sanitization. Which XSS category does this dangerous DOM sink enable?',
          type: 'input',
          practicalContext: 'Stored XSS, Reflected XSS, or DOM-based XSS.',
          hints: ['DOM or DOM-based XSS'],
          xp: 75,
          expectedAnswers: ['DOM-based XSS', 'DOM XSS', 'DOM', 'dom-based'],
          explanationOnSuccess: 'Correct! Modifying DOM elements directly on the client side with unsanitized sinks leads to DOM-based XSS.'
        }
      },
      {
        id: 'web-l3',
        courseId: 'web-security',
        order: 3,
        title: '3. SQL Injection (SQLi)',
        duration: '45 min',
        summary: 'Master SQL injection mechanics, in-band and blind SQLi payloads, and parameterized queries / prepared statements.',
        contentSections: [
          {
            title: 'Vulnerable SQL Concatenation',
            body: 'When user input is concatenated directly into SQL queries:\n```sql\nSELECT * FROM users WHERE user = \'\' OR \'1\'=\'1\' --\' AND pass = \'...\';\n```\nBecause `\'1\'=\'1\'` is always true, the database returns all user records without checking the password!'
          },
          {
            title: 'The True Defense: Parameterized Queries',
            body: 'Using Prepared Statements ensures the database driver treats input strictly as literal values rather than executable SQL syntax.'
          }
        ],
        task: {
          id: 'task-web-l3',
          title: 'SQLi Defense Verification',
          prompt: 'What primary programming defense guarantees that user input is treated strictly as data and never executed as SQL command syntax?',
          type: 'input',
          practicalContext: 'Parameterized Queries or Prepared Statements.',
          hints: ['Parameterized queries or Prepared statements'],
          xp: 80,
          expectedAnswers: ['Parameterized queries', 'parameterized queries', 'Prepared statements', 'prepared statements'],
          explanationOnSuccess: 'Excellent! Parameterized queries / Prepared statements are the gold standard defense against SQL Injection.'
        }
      },
      {
        id: 'web-l4',
        courseId: 'web-security',
        order: 4,
        title: '4. Cross-Site Request Forgery (CSRF)',
        duration: '35 min',
        summary: 'Understand how malicious sites trick authenticated user browsers into performing state-changing actions, and how Anti-CSRF tokens defend.',
        contentSections: [
          {
            title: 'The Mechanics of CSRF',
            body: 'Because browsers automatically attach session cookies to cross-origin requests, a malicious website can trigger unwanted actions (e.g. money transfer or password change) while you are logged in elsewhere.'
          }
        ],
        task: {
          id: 'task-web-l4',
          title: 'CSRF Defense Token',
          prompt: 'What unpredictable, secret token generated by the server and validated upon state-changing requests is used to prevent CSRF?',
          type: 'input',
          practicalContext: 'Anti-CSRF token or CSRF token.',
          hints: ['CSRF token', 'Anti-CSRF token'],
          xp: 70,
          expectedAnswers: ['CSRF token', 'anti-csrf token', 'Anti-CSRF Token', 'csrf token'],
          explanationOnSuccess: 'Correct! Anti-CSRF tokens ensure that requests originate from a legitimate form generated by the application.'
        }
      },
      {
        id: 'web-l5',
        courseId: 'web-security',
        order: 5,
        title: '5. Broken Access Control & IDOR',
        duration: '40 min',
        summary: 'Learn Insecure Direct Object References (IDOR), parameter tampering, and server-side authorization enforcement.',
        contentSections: [
          {
            title: 'What is IDOR?',
            body: 'IDOR occurs when an application exposes a reference to an internal object (e.g. `/api/invoice?id=1042`) without verifying whether the requesting authenticated user owns that invoice. Simply changing the ID to 1043 allows unauthorized data access!'
          }
        ],
        task: {
          id: 'task-web-l5',
          title: 'IDOR Vulnerability Acronym',
          prompt: 'What is the 4-letter acronym for "Insecure Direct Object References"?',
          type: 'input',
          practicalContext: 'Enter the 4-letter acronym.',
          hints: ['IDOR'],
          xp: 70,
          expectedAnswers: ['IDOR', 'idor'],
          explanationOnSuccess: 'Spot on! IDOR represents one of the most widespread and severe Broken Access Control bugs in modern APIs.'
        }
      },
      {
        id: 'web-l6',
        courseId: 'web-security',
        order: 6,
        title: '6. OWASP Top 10 Defense',
        duration: '45 min',
        summary: 'Synthesize full-stack web application hardening, security testing workflows, and automated vulnerability scanning.',
        contentSections: [
          {
            title: 'OWASP Comprehensive Defense',
            body: 'Defending modern web apps requires secure defaults: strict CSP, input validation, output encoding, robust session handling, cryptographic hashing, and automated DAST/SAST testing in CI/CD pipelines.'
          }
        ],
        task: {
          id: 'task-web-l6',
          title: 'Web Security Master Flag',
          prompt: 'Submit the Web Security course flag: FLAG{owasp_appsec_warrior_unlocked}',
          type: 'flag',
          practicalContext: 'Submit the flag to graduate from Web Security.',
          hints: ['FLAG{owasp_appsec_warrior_unlocked}'],
          xp: 150,
          expectedAnswers: ['FLAG{owasp_appsec_warrior_unlocked}'],
          explanationOnSuccess: 'Course Completed! You have mastered Web Application Security!'
        }
      }
    ]
  },
  {
    id: 'ethical-hacking',
    slug: 'ethical-hacking-fundamentals',
    title: 'Ethical Hacking Fundamentals',
    description: 'Learn the legal methodology of penetration testing: OSINT reconnaissance, vulnerability scanning, exploitation, and reporting.',
    difficulty: 'Intermediate',
    estimatedTime: '5.0 Hours',
    iconName: 'Terminal',
    tag: 'Red Team Methodology',
    totalLessons: 6,
    lessons: [
      {
        id: 'eh-l1',
        courseId: 'ethical-hacking',
        order: 1,
        title: '1. The 5 Phases of Ethical Hacking',
        duration: '35 min',
        summary: 'Learn the structured methodology: Reconnaissance, Scanning, Gaining Access, Maintaining Access, and Clearing Tracks / Reporting.',
        contentSections: [
          {
            title: 'The Penetration Testing Framework',
            body: '1. Reconnaissance (OSINT & passive intelligence)\n2. Scanning & Enumeration (Nmap, Nikto, service mapping)\n3. Gaining Access (Exploitation, payload delivery)\n4. Maintaining Access (Persistence, reverse shells, C2)\n5. Covering Tracks / Reporting (In ethical hacking: comprehensive remediation reporting).'
          }
        ],
        task: {
          id: 'task-eh-l1',
          title: 'First Phase Identification',
          prompt: 'What is the very first phase of an ethical hacking assessment, focused on information gathering?',
          type: 'input',
          practicalContext: 'Often called Reconnaissance or Footprinting.',
          hints: ['Reconnaissance', 'Footprinting'],
          xp: 65,
          expectedAnswers: ['Reconnaissance', 'reconnaissance', 'Recon', 'recon', 'Footprinting'],
          explanationOnSuccess: 'Correct! Thorough reconnaissance lays the groundwork for every successful penetration test.'
        }
      },
      {
        id: 'eh-l2',
        courseId: 'ethical-hacking',
        order: 2,
        title: '2. Passive & Active Reconnaissance',
        duration: '40 min',
        summary: 'Utilize WHOIS, DNS enumeration, Shodan, Google Dorking, and passive certificate transparency logs.',
        contentSections: [
          {
            title: 'Passive vs Active Recon',
            body: '• Passive Recon: Gathers intelligence without sending packets directly to the target systems (e.g. Shodan, WHOIS, LinkedIn, Wayback Machine).\n• Active Recon: Interacts directly with the target (e.g. port scanning, DNS zone transfers, banner grabbing), creating alert records in target logs.'
          }
        ],
        task: {
          id: 'task-eh-l2',
          title: 'Search Engine for Connected Devices',
          prompt: 'Which famous search engine indexes internet-connected devices, industrial control systems, and open service banners? (Starts with S)',
          type: 'input',
          practicalContext: 'Enter the name of the internet-connected device search engine.',
          hints: ['Shodan', 'Shodan.io'],
          xp: 75,
          expectedAnswers: ['Shodan', 'shodan'],
          explanationOnSuccess: 'Correct! Shodan continuously scans the entire IPv4 address space, indexing exposed services and banners.'
        }
      },
      {
        id: 'eh-l3',
        courseId: 'ethical-hacking',
        order: 3,
        title: '3. Vulnerability Scanning & Analysis',
        duration: '40 min',
        summary: 'Employ tools like OpenVAS, Nessus, and Nikto to correlate identified open services against CVE databases.',
        contentSections: [
          {
            title: 'Common Vulnerabilities and Exposures (CVE)',
            body: 'CVEs assign standardized identifiers (e.g. CVE-2021-44228 for Log4Shell). Each CVE is assigned a CVSS (Common Vulnerability Scoring System) score from 0.0 to 10.0 based on exploitability, impact, and attack complexity.'
          }
        ],
        task: {
          id: 'task-eh-l3',
          title: 'Scoring Standard Acronym',
          prompt: 'What is the 4-letter acronym for the industry standard scoring system used to rank vulnerability severity from 0.0 to 10.0?',
          type: 'input',
          practicalContext: 'Common Vulnerability Scoring System.',
          hints: ['CVSS'],
          xp: 75,
          expectedAnswers: ['CVSS', 'cvss'],
          explanationOnSuccess: 'Correct! CVSS provides an open standard for communicating the severity of IT vulnerabilities.'
        }
      },
      {
        id: 'eh-l4',
        courseId: 'ethical-hacking',
        order: 4,
        title: '4. Exploitation Fundamentals',
        duration: '45 min',
        summary: 'Understand reverse shells, bind shells, Metasploit basics, and how payloads execute on target machines.',
        contentSections: [
          {
            title: 'Reverse Shell vs Bind Shell',
            body: '• Bind Shell: The target machine listens on a port and waits for the attacker to connect. Often blocked by target firewalls.\n• Reverse Shell: The target machine initiates an outbound TCP connection back to the attacker listening machine (`nc -lvnp 4444`). This cleanly bypasses most inbound firewall rules!'
          }
        ],
        task: {
          id: 'task-eh-l4',
          title: 'Shell Architecture Identification',
          prompt: 'In which type of shell does the target machine initiate an outbound connection back to the attacker machine?',
          type: 'input',
          practicalContext: 'Reverse shell or Bind shell?',
          hints: ['Reverse shell'],
          xp: 80,
          expectedAnswers: ['Reverse shell', 'reverse shell', 'Reverse Shell', 'reverse'],
          explanationOnSuccess: 'Spot on! Reverse shells are predominantly favored by testers because firewalls typically restrict inbound but permit outbound egress traffic.'
        }
      },
      {
        id: 'eh-l5',
        courseId: 'ethical-hacking',
        order: 5,
        title: '5. Post-Exploitation & Privilege Escalation',
        duration: '45 min',
        summary: 'Escalate from low-privilege user to root/SYSTEM using misconfigured sudo rights, kernel exploits, or unquoted service paths.',
        contentSections: [
          {
            title: 'Linux & Windows Privilege Escalation',
            body: 'Common automated enumeration scripts like LinPEAS and WinPEAS scan for:\n• Writable cron jobs running as root\n• Misconfigured sudoers rules (`sudo -l`)\n• Cleartext credentials left in web configuration files\n• Unquoted service path vulnerabilities in Windows services'
          }
        ],
        task: {
          id: 'task-eh-l5',
          title: 'Sudo Permission Check Command',
          prompt: 'Which command checks what privileges the current user has in the sudoers file on a Linux machine? (e.g. sudo ...)',
          type: 'input',
          practicalContext: 'Type the command that lists sudo privileges.',
          hints: ['sudo -l', 'The letter is lowercase L'],
          xp: 80,
          expectedAnswers: ['sudo -l', 'sudo -l;'],
          explanationOnSuccess: 'Correct! `sudo -l` lists the allowed and forbidden commands for the invoking user.'
        }
      },
      {
        id: 'eh-l6',
        courseId: 'ethical-hacking',
        order: 6,
        title: '6. Professional Reporting & Remediation',
        duration: '40 min',
        summary: 'Transform technical exploitation into actionable executive summaries, technical risk matrices, and remediation roadmaps.',
        contentSections: [
          {
            title: 'The Hallmark of an Ethical Hacker',
            body: 'The true deliverable of a security engagement is not the exploit, but the comprehensive report that empowers organizations to remediate vulnerabilities before malicious adversaries exploit them.'
          }
        ],
        task: {
          id: 'task-eh-l6',
          title: 'Ethical Hacking Capstone Flag',
          prompt: 'Submit the final capstone flag: FLAG{certified_ethical_pentester_verified}',
          type: 'flag',
          practicalContext: 'Enter the verified completion flag.',
          hints: ['FLAG{certified_ethical_pentester_verified}'],
          xp: 150,
          expectedAnswers: ['FLAG{certified_ethical_pentester_verified}'],
          explanationOnSuccess: 'Congratulations! Ethical Hacking Fundamentals course completed!'
        }
      }
    ]
  },
  {
    id: 'soc-blue-team',
    slug: 'soc-and-blue-team',
    title: 'SOC & Blue Team',
    description: 'Learn defensive cyber operations: SIEM log correlation, incident triage, threat hunting, MITRE ATT&CK, and containment playbooks.',
    difficulty: 'Advanced',
    estimatedTime: '5.5 Hours',
    iconName: 'ShieldAlert',
    tag: 'Defensive Operations',
    totalLessons: 6,
    lessons: [
      {
        id: 'soc-l1',
        courseId: 'soc-blue-team',
        order: 1,
        title: '1. SOC Roles & Cyber Kill Chain',
        duration: '40 min',
        summary: 'Understand Security Operations Center tiers (Tier 1 Triage, Tier 2 Incident Response, Tier 3 Threat Hunter) and the Lockheed Martin Cyber Kill Chain.',
        contentSections: [
          {
            title: 'SOC Hierarchy & Mission',
            body: '• Tier 1 Analyst (Triage): Monitors SIEM alerts, filters false positives, escalates real incidents.\n• Tier 2 Analyst (Incident Responder): Deep dive forensics, host containment, malware analysis.\n• Tier 3 Analyst / Threat Hunter: Proactively searches for stealth adversaries already inside the network who bypassed alerts.'
          },
          {
            title: 'The Cyber Kill Chain Phases',
            body: 'Reconnaissance -> Weaponization -> Delivery -> Exploitation -> Installation -> Command and Control (C2) -> Actions on Objectives.'
          }
        ],
        task: {
          id: 'task-soc-l1',
          title: 'Kill Chain Phase Identification',
          prompt: 'In the Cyber Kill Chain, what phase immediately precedes Exploitation, involving transmitting the malicious payload to the victim (e.g. via email attachment)?',
          type: 'input',
          practicalContext: 'Weaponization, Delivery, or Exploitation?',
          hints: ['Delivery', 'How the malicious file gets delivered to the target'],
          xp: 70,
          expectedAnswers: ['Delivery', 'delivery'],
          explanationOnSuccess: 'Correct! Delivery is the stage where the adversary delivers the weaponized payload to the victim system.'
        }
      },
      {
        id: 'soc-l2',
        courseId: 'soc-blue-team',
        order: 2,
        title: '2. SIEM Fundamentals & Log Correlation',
        duration: '45 min',
        summary: 'Explore Splunk, Elastic Security, and Microsoft Sentinel: aggregating syslog, Windows Event Logs, and writing detection rules.',
        contentSections: [
          {
            title: 'What is a SIEM?',
            body: 'Security Information and Event Management (SIEM) aggregates event logs from thousands of endpoints, cloud platforms, and network appliances. It normalizes data and runs correlation rules to alert on multi-stage attack patterns (e.g. 5 failed logins followed by a successful login and privilege escalation).'
          }
        ],
        task: {
          id: 'task-soc-l2',
          title: 'Windows Event ID for Successful Logon',
          prompt: 'What famous Windows Security Log Event ID indicates a successful account logon? (4-digit number)',
          type: 'input',
          practicalContext: 'Failed logon is 4625. What is successful logon?',
          hints: ['4624', 'One less than 4625'],
          xp: 75,
          expectedAnswers: ['4624'],
          explanationOnSuccess: 'Correct! Event ID 4624 in the Windows Security Log records successful authentications.'
        }
      },
      {
        id: 'soc-l3',
        courseId: 'soc-blue-team',
        order: 3,
        title: '3. Incident Response & Triage',
        duration: '45 min',
        summary: 'Master the NIST SP 800-61 incident response lifecycle: Preparation, Detection & Analysis, Containment, Eradication, Recovery, Post-Incident Activity.',
        contentSections: [
          {
            title: 'NIST IR Lifecycle',
            body: 'When a ransomware outbreak begins, responders must swiftly execute Containment (isolating affected network segments from the core switch) before Eradication (wiping malicious payloads).'
          }
        ],
        task: {
          id: 'task-soc-l3',
          title: 'IR Stage for Removing Malicious Artifacts',
          prompt: 'In the NIST Incident Response lifecycle, what phase involves completely removing malware, backdoors, and compromised credentials from the environment?',
          type: 'input',
          practicalContext: 'Preparation, Detection, Containment, Eradication, Recovery.',
          hints: ['Eradication', 'Starts with E'],
          xp: 75,
          expectedAnswers: ['Eradication', 'eradication'],
          explanationOnSuccess: 'Spot on! Eradication focuses on deleting malware, disabling compromised accounts, and closing known vulnerabilities.'
        }
      },
      {
        id: 'soc-l4',
        courseId: 'soc-blue-team',
        order: 4,
        title: '4. Threat Intelligence & MITRE ATT&CK',
        duration: '50 min',
        summary: 'Navigate the MITRE ATT&CK matrix: Tactics (the "Why"), Techniques (the "How"), and Indicators of Compromise (IoCs).',
        contentSections: [
          {
            title: 'The MITRE ATT&CK Matrix',
            body: 'MITRE ATT&CK provides a curated knowledge base of adversary behaviors based on real-world observations. Tactics represent the adversary objective (e.g. Initial Access, Persistence, Defense Evasion), while Techniques detail specific technical implementations (e.g. T1059 Command and Scripting Interpreter).'
          }
        ],
        task: {
          id: 'task-soc-l4',
          title: 'Threat Intel Framework Acronym',
          prompt: 'What is the acronym for the globally accessible knowledge base of adversary tactics and techniques maintained by MITRE?',
          type: 'input',
          practicalContext: 'MITRE ...',
          hints: ['ATT&CK', 'MITRE ATT&CK', 'ATTCK'],
          xp: 80,
          expectedAnswers: ['ATT&CK', 'att&ck', 'ATTCK', 'MITRE ATT&CK'],
          explanationOnSuccess: 'Correct! The MITRE ATT&CK framework has become the universal taxonomy for cyber defense and detection engineering.'
        }
      },
      {
        id: 'soc-l5',
        courseId: 'soc-blue-team',
        order: 5,
        title: '5. Malware Analysis Basics',
        duration: '45 min',
        summary: 'Perform static analysis (file hashing, strings inspection, PE headers) and dynamic sandbox analysis safely.',
        contentSections: [
          {
            title: 'Static vs Dynamic Analysis',
            body: '• Static Analysis: Inspects the executable without running it (e.g. generating SHA-256 hash, checking VirusTotal, analyzing strings for C2 domains or IP addresses).\n• Dynamic Analysis: Executes the malware inside an isolated, instrumented sandbox (like Cuckoo Sandbox) to observe registry modifications and outbound network calls.'
          }
        ],
        task: {
          id: 'task-soc-l5',
          title: 'Static Analysis Command',
          prompt: 'Which Linux command extracts human-readable text sequences from binary executable files during static malware triage?',
          type: 'input',
          practicalContext: 'Command that prints printable character sequences.',
          hints: ['strings', 'strings command'],
          xp: 80,
          expectedAnswers: ['strings', 'strings filename'],
          explanationOnSuccess: 'Correct! The `strings` command quickly surfaces hardcoded URLs, debug paths, error messages, and function names in malware samples.'
        }
      },
      {
        id: 'soc-l6',
        courseId: 'soc-blue-team',
        order: 6,
        title: '6. Containment & Eradication Playbooks',
        duration: '50 min',
        summary: 'Put defensive theory into practice by executing automated SOAR playbooks, isolating compromised hosts, and conducting post-mortems.',
        contentSections: [
          {
            title: 'Defensive Operations Mastery',
            body: 'A mature Blue Team relies on automated SOAR (Security Orchestration, Automation, and Response) playbooks to isolate endpoints within seconds of high-fidelity ransomware detection, mitigating multi-million dollar business interruptions.'
          }
        ],
        task: {
          id: 'task-soc-l6',
          title: 'Blue Team Master Flag',
          prompt: 'Submit the Blue Team graduation flag: FLAG{soc_sentinel_blue_team_guardian}',
          type: 'flag',
          practicalContext: 'Submit the final flag to complete the SOC & Blue Team course.',
          hints: ['FLAG{soc_sentinel_blue_team_guardian}'],
          xp: 200,
          expectedAnswers: ['FLAG{soc_sentinel_blue_team_guardian}'],
          explanationOnSuccess: 'EXCELLENT! You have conquered the SOC & Blue Team curriculum and proven yourself as a cyber defender!'
        }
      }
    ]
  }
];

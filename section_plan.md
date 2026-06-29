TACO GitHub Project Page Section Revision Requirements

Overall Goal

This revision focuses on adjusting the content and order of each section of the TACO GitHub project page.

The website should present TACO as a tactile-aware world-model framework that uses imagination to turn real-world robot failures into corrective supervision for scalable VLA post-training.

The page should remain a clean academic project page, but the structure should emphasize:

* World model
* Imagination
* Real-world robot failures
* Visuo-tactile correction
* Self-correction loop
* Scalable VLA post-training

All static files are under:

/Users/joy/Projects/taco/taco.github.io/public/assets/

In the website code, use web paths beginning with:

/assets/

Do not use:

/public/assets/

⸻

Section 1: Hero / Title

Content

Main title:

TACO

Subtitle:

TActile World Model as a Self-COrrector for Scalable VLA Post-Training

One-sentence project description:

TACO is a tactile-aware world-model framework that turns real-world robot failures into imagined visuo-tactile corrections for scalable VLA post-training.

Keywords:

Robotic Manipulation, Tactile World Model

Authors

Show the authors under the title.

Shengbang Liu, Yueru Jia, Yuyang Yan, Jiaming Liu, Xinran Zhang, Qiuxuan Feng, Yandong Guo, Shiji Zhou, Boxin Shi, Shanghang Zhang

Author links:

Shengbang Liu: https://liushb9.github.io/
Yueru Jia: https://jiayueru.github.io/
Yuyang Yan: https://github.com/avx34/
Jiaming Liu: https://liujiaming1996.github.io/
Xinran Zhang: https://github.com/XinranJoy
Qiuxuan Feng: https://github.com/xuanxuanzzzii
Yandong Guo: https://scholar.google.com/citations?user=fWDoWsQAAAAJ&hl=en
Shiji Zhou: https://arnoldshijizhou.github.io/
Boxin Shi: https://camera.pku.edu.cn/
Shanghang Zhang: https://scholar.google.com/citations?user=voqw10cAAAAJ&hl=en

Organizations

Show the organizations below the author list.

Peking University · AI2 Robotics · Sun Yat-sen University · Beihang University

Buttons

Buttons should appear in the hero section.

Required buttons:

Paper
Code
Video
BibTeX

Button links:
Paper: coming soon
Code: https://github.com/liushb9/TACO
Video: /assets/project_video.mp4
BibTeX: #bibtex

key words: Robotic Manipulation, Tactile World Model
⸻

Section 2: Main Video
Use:

/assets/project_video.mp4

Local source file:

/Users/joy/Projects/taco/taco.github.io/public/assets/project_video.mp4

Layout

Use a large centered video card.

Recommended video settings:

<video controls muted playsInline>
  <source src="/assets/project_video.mp4" type="video/mp4" />
</video>

Optional Section Title

Section 3: Abstract

Title: Abstract

Content

Use the following abstract text:

Vision-Language-Action (VLA) models have shown promising generalization in robotic manipulation, but they still struggle with contact-rich tasks, where minor contact perturbations can cause unrecoverable failures that are hard to detect from vision alone.
Since these failures are localized rather than task-level semantic errors, tactile-aware corrective post-training offers an efficient way to improve recovery.
However, scaling such supervision through human intervention is costly.
Recent works have explored world models to synthesize imagined rollouts for policy improvement, but vision-only world models may produce visually plausible yet contact-inconsistent trajectories.
We therefore introduce TACO, a tactile-aware world-model-driven framework for scalable VLA post-training in contact-rich manipulation.
Given real robot rollouts, TACO follows a Recognize--Imagine--Label loop with a tactile-aware world model: a unified progress-action model recognizes failure-adjacent states using progress estimates, a visuo-tactile generation model imagines local correction segments, and the progress-action model labels them with executable corrective actions.
To incorporate tactile corrective supervision into VLA post-training, TACO combines knowledge-insulated tactile adaptation with advantage-conditioned training, enabling the policy to learn from imagined corrections without degrading pretrained visual-language priors.
These components enable TACO to convert real-world failures into imagined visuo-tactile corrections for iterative VLA post-training.
Experiments on real-world contact-rich manipulation tasks show that TACO achieves 44% absolute success rate improvement over the base policy and 32% over the policy without knowledge-insulated tactile adaptation.

Formatting Requirement
Do not keep LaTeX syntax, convert them into normal HTML / React formatting.

Section 4: Key Contributions

Title: Key Contributions

Layout: Make this section into 3 verticle cards in one line.

Each card should contain:

* A short title
* A concise website-style description
* Do not use long paper-style contribution sentences

Card 1

Title:
Tactile-Aware World Model

Description:
TACO jointly models future video frames and force trajectories, allowing imagined rollouts to remain consistent with both visual motion and contact dynamics.

Card 2

Title:Recognize–Imagine–Label Loop

Description: TACO recognizes failure-adjacent contact states, imagines local visuo-tactile recoveries, and labels the corrective actions needed for policy improvement.

Card 3

Title: Knowledge-Insulated Post-Training

Description: TACO incorporates tactile corrective supervision without eroding pretrained visual-language priors by routing tactile learning to the action expert and using advantage-conditioned training.

⸻

Section 5: Method

Title

Method

Main Visual

Use the pipeline figure.

Preferred asset:

/assets/img/paper_img/pipeline_v5.png

If the PNG version does not exist yet, use the PDF temporarily or leave a TODO comment:

/assets/img/paper_img/pipeline_v5.pdf

Local source:

/Users/joy/Projects/taco/taco.github.io/public/assets/img/paper_img/pipeline_v5.png

Method Steps

Use 4 steps (between each step, 我需要手写版动画箭头，指向下一个step。每个steps都需要紧密、是一个block) 从上到下依次排列4个steps

Step 1: Recognize

Title:

Recognize

Main text:

Find the moment where contact starts to go wrong.

Expanded text, optional:

A unified progress-action model detects failure-adjacent states where task progress stalls or decreases.

⸻

Step 2: Imagine

Title:

Imagine

Main text:

Starting from the failure-adjacent state, the tactile-aware world model generates a local correction segment, including both future video frames and force trajectories.

Short caption:

Imagine what a successful contact recovery should look and feel like.

⸻

Step 3: Label

Title:

Label

Main text:

The progress-action model labels the imagined segment with executable corrective actions and progress values.

Short caption:

Turn imagined recovery into training supervision.

⸻

Step 4: Post-Train

Title:

Post-Train

Main text:

The VLA policy is post-trained with real rollouts, demonstrations, and imagined corrections. Tactile learning is routed to the action expert while the pretrained VLM backbone is protected.

Short caption:

Improve the robot without repeatedly asking humans to intervene.

⸻

Section 6: Results

Title

Results

Key Result Bullets

Show these as statistic cards or highlighted bullets.

6 real-world contact-rich tasks:
Bullet point for data
40 independent evaluation episodes per task
82% average success rate after two iterations
+44% absolute success rate over the base policy
127.7 average completion steps, compared with 185.5 for the base policy


Successful Rollouts （as illustration for contact rich tasks

Purpose

Show successful rollout videos for the six real-world tasks.

Asset Directory
Use videos from:
/Users/joy/Projects/taco/taco.github.io/public/assets/img/experiment_process/success_rollout

Website path:
/assets/img/experiment_process/success_rollout/

Tasks

The six tasks are:

Insert Flower
Wipe Whiteboard
Twist Bottle Cap
Play Xylophone
Toast Bread
Move Hanoi Rings

Implementation Requirement

Do not hardcode files before checking the actual filenames in this directory.

First inspect:

ls -R public/assets/img/experiment_process/success_rollout

Then map each video file to the corresponding task.

Recommended layout:

* 2-column video grid
* Each video card has:
    * Task name
    * Video
⸻

Next section of videos -- should have same

Title: Generalization Performance

Asset Directory Use videos from:
/Users/joy/Projects/taco/taco.github.io/public/assets/img/experiment_process/ood

Website path:

/assets/img/experiment_process/ood/

Generalization Tasks

There are 2 main tasks:

Insert Flower
Wipe Whiteboard

Conditions

For Insert Flower:

pink
yellow
flash

For Wipe Whiteboard:

whiteboard
position
flash

Implementation Requirement

Do not hardcode the filenames before checking the directory.

First inspect:

ls -R public/assets/img/experiment_process/ood

Then map the actual video files to:

Insert Flower - Pink
Insert Flower - Yellow
Insert Flower - Flash
Wipe Whiteboard - Whiteboard
Wipe Whiteboard - Position
Wipe Whiteboard - Flash

Recommended layout:
* Group videos by task in one line (in total 2 line and 3 column)
* Each group has 3 video cards
* Keep captions short

⸻

Section 9: Table / Quantitative Results

These are the latex format, change it to the website format
\begin{table*}[t!]
    \centering
    \resizebox{\textwidth}{!}{%
    \setlength{\tabcolsep}{5pt}
    \renewcommand{\arraystretch}{1.15}
    \begin{tabular}{l*{7}{cc}}
        \multicolumn{15}{@{}c@{}}{%
            \makebox[\linewidth][c]{\includegraphics[width=1.14\linewidth]{image/task_visualization1.jpg}}
        } \\[-2pt]
        
        \toprule
        \textbf{Method}
        & \multicolumn{2}{c}{\makecell{\textit{Insert}\\\textit{Flower}}}
        & \multicolumn{2}{c}{\makecell{\textit{Wipe}\\\textit{Whiteboard}}}
        & \multicolumn{2}{c}{\makecell{\textit{Twist}\\\textit{Bottle Cap}}}
        & \multicolumn{2}{c}{\makecell{\textit{Play}\\\textit{Xylophone}}}
        & \multicolumn{2}{c}{\makecell{\textit{Toast}\\\textit{Bread}}}
        & \multicolumn{2}{c}{\makecell{\textit{Move}\\\textit{Hanoi Rings}}}
        & \multicolumn{2}{c}{Ave} \\
        \cmidrule(lr){2-3}
        \cmidrule(lr){4-5}
        \cmidrule(lr){6-7}
        \cmidrule(lr){8-9}
        \cmidrule(lr){10-11}
        \cmidrule(lr){12-13}
        \cmidrule(lr){14-15}
        & SR & CS
        & SR & CS
        & SR & CS
        & SR & CS
        & SR & CS
        & SR & CS
        & SR & CS \\
        \midrule

        Base Policy
        & 0.50 & 250
        & 0.51 & 151
        & 0.45 & 131
        & 0.46 & 132
        & 0.30 & 183
        & 0.08 & 266
        & 0.38 & 185.5 \\

        \midrule
        \rowcolor{gray!15}
        \multicolumn{15}{c}{\textit{Iteration 1}} \\
        \midrule
        Filtered BC
        & 0.55 & 274
        & 0.54 & 120
        & 0.50 & 62
        & 0.49 & 128
        & 0.32 & 189
        & 0.07 & 120
        & 0.41 & 148.8 \\

        TACO (w/o KI)
        & 0.55 & 233
        & 0.33 & 100
        & 0.55 & 58
        & 0.58 & 144
        & 0.48 & 193
        & 0.42 & 201
        & 0.49 & 154.8 \\

        \rowcolor{red!10!blue!10}
        \textbf{TACO}
        & 0.70 & 207
        & 0.55 & 95
        & 0.85 & 56
        & 0.63 & 115
        & 0.70 & 184
        & 0.51 & 194
        & 0.66 & 141.8 \\

        \midrule
        \rowcolor{gray!15}
        \multicolumn{15}{c}{\textit{Iteration 2}} \\
        \midrule
        Filtered BC
        & 0.52 & 289
        & 0.57 & 133
        & 0.48 & 79
        & 0.51 & 125
        & 0.36 & 177
        & 0.11 & 130
        & 0.43 & 155.5 \\

        TACO (w/o KI)
        & 0.62 & 223
        & 0.35 & 98
        & 0.65 & \textbf{51}
        & 0.52 & 120
        & 0.51 & 191
        & 0.37 & 196
        & 0.50 & 146.5 \\

        \rowcolor{red!10!blue!10}
        \textbf{TACO}
        & \textbf{0.93} & \textbf{169}
        & \textbf{0.65} & \textbf{87}
        & \textbf{0.98} & 52
        & \textbf{0.78} & \textbf{97}
        & \textbf{0.81} & \textbf{177}
        & \textbf{0.79} & \textbf{184}
        & \textbf{0.82} & \textbf{127.7} \\
        \bottomrule
    \end{tabular}
    }


After implementation, report:

1. Which files were modified
2. Which sections were added or reordered
3. Whether /assets/project_video.mp4 works
4. Whether /assets/paper.pdf works
5. Which success rollout videos were found
6. Which OOD videos were found
7. Whether any PDF figures still need conversion
8. How to run locally
9. How to build
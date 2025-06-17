#!/bin/bash
cd /home/kavia/workspace/code-generation/twinx-tic-tac-toe-110368-a1861f65/twinx_tic_tac_toe_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


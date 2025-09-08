CC = gcc
CFLAGS = -Wall -O2
SRC_DIR = src
BIN_DIR = bin
TARGET = $(BIN_DIR)/sys_uptime

$(TARGET): $(SRC_DIR)/sys_uptime.c
	@mkdir -p $(BIN_DIR)
	$(CC) $(CFLAGS) $< -o $@
	@echo "✅ Built: $@"

build: $(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: build clean
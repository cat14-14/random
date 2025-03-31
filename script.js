document.querySelectorAll('input[name="mode"]').forEach(radio => {
    radio.addEventListener('change', () => {
      document.getElementById('nameMode').style.display =
        radio.value === 'name' ? 'block' : 'none';
      document.getElementById('numberMode').style.display =
        radio.value === 'number' ? 'block' : 'none';
    });
  });
  
  document.getElementById('drawButton').addEventListener('click', () => {
    const mode = document.querySelector('input[name="mode"]:checked').value;
    const groupCount = parseInt(document.getElementById('groupCount').value);
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
  
    if (isNaN(groupCount) || groupCount <= 0) {
      resultDiv.innerHTML = '<div class="group">⚠️ 모둠 개수를 올바르게 입력해 주세요.</div>';
      return;
    }
  
    if (mode === 'name') {
      const names = document.getElementById('names').value
        .split(',')
        .map(n => n.trim())
        .filter(n => n);
      if (names.length === 0) {
        resultDiv.innerHTML = '<div class="group">⚠️ 이름을 하나 이상 입력해 주세요.</div>';
        return;
      }
  
      // 이름 모드: 균등 분배 (남는 인원은 순차적으로 분배)
      shuffle(names);
      const groups = Array.from({ length: groupCount }, () => []);
      names.forEach((name, i) => {
        groups[i % groupCount].push(name);
      });
  
      printGroups(groups, resultDiv);
    }
  
    else if (mode === 'number') {
      const max = parseInt(document.getElementById('numberMax').value);
      if (isNaN(max) || max <= 0) {
        resultDiv.innerHTML = '<div class="group">⚠️ 올바른 번호 범위를 입력해 주세요.</div>';
        return;
      }
  
      // 번호 리스트 생성
      const list = Array.from({ length: max }, (_, i) => `${i + 1}번`);
      shuffle(list);
  
      // 균등 분배 후 남는 인원은 마지막 모둠에만 넣기
      const basePerGroup = Math.floor(list.length / groupCount);
      const remainder = list.length % groupCount;
      const groups = Array.from({ length: groupCount }, () => []);
  
      let index = 0;
      for (let i = 0; i < groupCount; i++) {
        for (let j = 0; j < basePerGroup; j++) {
          groups[i].push(list[index++]);
        }
      }
  
      // 나머지 번호는 마지막 조에만 넣음
      for (let r = 0; r < remainder; r++) {
        groups[groupCount - 1].push(list[index++]);
      }
  
      printGroups(groups, resultDiv);
    }
  });
  
  function printGroups(groups, resultDiv) {
    resultDiv.innerHTML = '';
    groups.forEach((group, i) => {
      const groupHTML = `<div class="group"><strong>${i + 1}모둠</strong>${group.join(', ')}</div>`;
      resultDiv.innerHTML += groupHTML;
    });
  }
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  